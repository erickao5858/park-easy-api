//  Logger
const Utility = require('../utility')
const logger = Utility.getLogger('Auth-google')

let clientID, clientSecret

// Read google client id
if (!process.env.GOOGLE_CLIENT_ID) {
    // If not found in process.env
    try {
        // Read id from configuration file
        const { GOOGLE_CLIENT_ID } = require('../EVs')
        if (!GOOGLE_CLIENT_ID) {
            logger.fatal('Enviornment variable "GOOGLE_CLIENT_ID" not found')
            process.exit(0)
        }
        clientID = GOOGLE_CLIENT_ID
    } catch (e) {
        logger.fatal('Enviornment variable "GOOGLE_CLIENT_ID" not found')
        process.exit(0)
    }
    logger.warn('Environment variable "GOOGLE_CLIENT_ID" is stored locally, which is not recommended')
}
else {
    // Use string specified in process.env
    clientID = process.env.GOOGLE_CLIENT_ID
}

// Read google client secret
if (!process.env.GOOGLE_CLIENT_SECRET) {
    // If not found in process.env
    try {
        // Read id from configuration file
        const { GOOGLE_CLIENT_SECRET } = require('../EVs')
        if (!GOOGLE_CLIENT_SECRET) {
            logger.fatal('Enviornment variable "GOOGLE_CLIENT_SECRET" not found')
            process.exit(0)
        }
        clientSecret = GOOGLE_CLIENT_SECRET
    } catch (e) {
        logger.fatal('Enviornment variable "GOOGLE_CLIENT_SECRET" not found')
        process.exit(0)
    }
    logger.warn('Environment variable "GOOGLE_CLIENT_SECRET" is stored locally, which is not recommended')
}
else {
    // Use string specified in process.env
    clientSecret = process.env.GOOGLE_CLIENT_SECRET
}

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
passport.use(new GoogleStrategy(
    {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ providerID: profile.id }).then((user) => {
            if (user) {
                done(null, user)
            } else {
                new User({
                    provider: 'google',
                    providerID: profile.id,
                    displayName: profile.displayName
                }).save().then((newUser) => {
                    done(null, newUser)
                })
            }
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})