const SettingItem = require('../models/settingItem')
const Utility = require('../utility')
const logger = Utility.getLogger('Setting-item')

exports.getSettingItems = (req, res) => {
    SettingItem.find({}, (err, records) => {
        if (err) {
            logger.error('Request failed at function SettingItem.find')
            return res.json({ success: false, err: err })
        }
        return res.json({ success: true, settingItems: records })
    })
}

exports.addSettingItem = (req, res) => {
    SettingItem.create({ name: req.body.name, type: req.body.type, default: req.body.default }, (err, record) => {
        if (err) {
            logger.error('Request failed at function SettingItem.create')
            return res.json({ success: false, err: err })
        }
        return res.json({ success: true, settingItem: record })
    })
}