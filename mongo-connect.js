/** Mongoose Setup */
const mongoose = require('mongoose')
const passport = require('passport')

mongoose.connect('mongodb+srv://erickao:U08uDNf0bolf0eIL@cluster0.pjqwo.mongodb.net/parkEasy?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('Error: database cannot be accessed.')
        process.exit(0)
    }
})

const User = require('./models/user')

/** Passport Local Authentication */

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = mongoose.connection