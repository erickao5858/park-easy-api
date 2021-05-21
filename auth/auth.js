/** Passport with Local Strategy */
require('./authLocal')

/** Passport with Google Strategy */
require('./authGoogle')

/** Passport with Facebook Strategy */
require('./authFacebook')

const passport = require('passport')
const User = require('../models/user')

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})