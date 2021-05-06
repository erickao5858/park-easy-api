const express = require('express')
const router = express.Router()

// Import functions from controller
const { getSettings, updateSettings } = require('../controllers/userSettingController')

// Redirect requests to handler
router.get('/userSetting', getSettings)
router.post('/userSetting', updateSettings)

module.exports = router