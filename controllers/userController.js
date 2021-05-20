const User = require('../models/user')

exports.register = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // Register user with credentials
    User.register({ username: username, active: false }, password, (err) => {
        if (err) {
            return res.json({ success: false, err: err })
        }
        return res.json({ success: true })
    })
}

exports.logout = (req, res) => {
    req.logout()
    return res.redirect(process.env.WEB_URL + 'login')
}

exports.isUserExists = (userID, callback) => {
    User.findOne({ _id: userID }, callback)
}