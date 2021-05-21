const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const { findOrCreate } = require('./authHandler')

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    }, findOrCreate))