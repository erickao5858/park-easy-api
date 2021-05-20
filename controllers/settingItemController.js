const SettingItem = require('../models/settingItem')

exports.getSettingItems = (req, res) => {
    SettingItem.find({}, (err, records) => {
        if (err) {
            return res.json({ success: false, err: err })
        }
        return res.json({ success: true, settingItems: records })
    })
}

exports.addSettingItem = (req, res) => {
    SettingItem.create({ name: req.body.name, type: req.body.type, default: req.body.default }, (err, record) => {
        if (err) {
            return res.json({ success: false, err: err })
        }
        return res.json({ success: true, settingItem: record })
    })
}