const passport = require('passport')
const User = require('../models/user')

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json({ success: false })
        }
        return res.json({ success: true, userID: user._id, username: user.username })
    })(req, res, next)
}

exports.register = (req, res) => {
    User.register({ username: req.body.username, active: false }, req.body.password, (err) => {
        if (err) {
            return res.json({ success: false })
        }
        return res.json({ success: true })
    })
}