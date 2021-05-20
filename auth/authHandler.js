const User = require('../models/user')
exports.findOrCreate = (accessToken, refreshToken, profile, done) => {
    User.findOne({ providerID: profile.id }).then((user) => {
        if (user) {
            done(null, user)
        } else {
            new User({
                provider: profile.provider,
                providerID: profile.id,
                displayName: profile.displayName
            }).save().then((newUser) => {
                done(null, newUser)
            })
        }
    })
}