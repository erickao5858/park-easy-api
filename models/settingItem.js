const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingItemSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    default: { type: Schema.Types.Mixed, required: true }
}, {
    collection: 'setting_Item'
})

const SettingItem = mongoose.model('setting_Item', settingItemSchema)

module.exports = SettingItem