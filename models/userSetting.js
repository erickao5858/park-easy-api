const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSettingSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, required: true },
    settings: { type: String, required: true }
}, {
    collection: 'user_setting'
})

const UserSetting = mongoose.model('user_setting', userSettingSchema)

module.exports = UserSetting