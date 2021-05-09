const Utility = require('../utility')
const UserSetting = require('../models/userSetting')
const { isUserExists } = require('./userController')
const logger = Utility.getLogger('User-setting')

exports.getSettings = (req, res) => {
    const token = req.query.token
    Utility.verifyToken(token, (err, decoded) => {
        if (err) {
            return res.json({ success: false, err: err })
        }

        // UserID retrieved here is always valid 
        // since only authentication server can 
        // generate the token with correct private key
        // That means no third party can create a fake token
        const userID = decoded.identities[0].id
        isUserExists(userID, (err, record) => {
            if (err) {
                logger.error('Request failed at function isUserExists')
                return res.json({ success: false, err: { message: 'Service unavailable!', details: err } })
            }
            if (!record) {
                return res.json({ success: false, err: { message: 'User not found!' } })
            }
            UserSetting.findOne({ userID: userID }, (err, record) => {
                if (err) {
                    logger.error('Request failed at function UserSetting.findOne')
                    return res.json({ success: false, err: { message: 'Service unavailable!', details: err } })
                }
                if(!record){
                    return res.json({ success: false, err: { message: 'Record not found!' } })
                }
                return res.json({ success: true, userSettings: record })
            })
        })
    })
}

exports.updateSettings = (req, res) => {
    const token = req.body.token
    const userSettings = req.body.userSettings

    if (!userSettings) {
        return res.json({ success: false, err: { message: 'User settings are required!' } })
    }
    Utility.verifyToken(token, (err, decoded) => {
        if (err) {
            return res.json({ success: false, err: err })
        }

        // UserID retrieved here is always valid 
        // since only authentication server can 
        // generate the token with correct private key
        // That means no third party can create a fake token
        const userID = decoded.identities[0].id
        isUserExists(userID, (err, record) => {
            if (err) {
                logger.error('Request failed at function isUserExists')
                return res.json({ success: false, err: { message: 'Service unavailable!', details: err } })
            }
            if (!record) {
                return res.json({ success: false, err: { message: 'User not found!' } })
            }
            UserSetting.findOneAndUpdate({ userID: userID }, { settings: userSettings }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, record) => {
                if (err) {
                    logger.error('Request failed at function UserSetting.findOneAndUpdate')
                    return res.json({ success: false, err: { message: 'Service unavailable!', details: err } })
                } else {
                    return res.json({ success: true, userSettings: record })
                }
            })
        })
    })
}