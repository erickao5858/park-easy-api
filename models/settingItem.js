const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingItemSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    default: { type: Schema.Types.Mixed, required: true }
}, {
    collection: 'setting_Item'
})

// Declare setting model which allows direct data manipulate
const SettingItem = mongoose.model('setting_Item', settingItemSchema)

module.exports = SettingItem