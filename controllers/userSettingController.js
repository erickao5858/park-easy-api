const Utility = require('../utility')
const UserSetting = require('../models/userSetting')
const { isUserExists } = require('./userController')

// TODO: extract user verification as a utility function
exports.getSettings = (req, res) => {
    const userID = req.query.userID

    // Validate user ID
    let result = Utility.isValidObjectID(userID)
    if (result == Utility.ERROR_STRING_IS_EMPTY) {
        return res.json({ success: false, err: { message: 'User ID is required for this action!' } })
    }
    if (result == Utility.ERROR_STRING_INVALID) {
        return res.json({ success: false, err: { message: 'User ID is invaild!' } })
    }

    isUserExists(userID, (result) => {
        if (result) {
            UserSetting.findOne({ userID: userID }, (err, records) => {
                if (err) {
                    return res.json({ success: false, err: err })
                } else {
                    return res.json({ success: true, userSettings: records })
                }
            })
        } else {
            return res.json({ success: false, err: { message: 'User not exist!' } })
        }
    })
}

exports.updateSettings = (req, res) => {
    const userID = req.body.userID
    const userSettings = req.body.userSettings

    // Validate user ID
    const result = Utility.isValidObjectID(userID)
    if (result == Utility.ERROR_STRING_IS_EMPTY) {
        return res.json({ success: false, err: { message: 'User ID is required for this action!' } })
    }
    if (result == Utility.ERROR_STRING_INVALID) {
        return res.json({ success: false, err: { message: 'User ID is invaild!' } })
    }

    isUserExists(userID, (result) => {
        if (result) {
            UserSetting.findOneAndUpdate(
                { userID: userID },
                { settings: userSettings },
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                },
                (err, record) => {
                    if (err) {
                        return res.json({ success: false, err: err })
                    } else {
                        return res.json({ success: true, userSettings: record })
                    }
                })
        } else {
            return res.json({ success: false, err: { message: 'User not exist!' } })
        }
    })
}