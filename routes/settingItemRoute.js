const express = require('express')
const router = express.Router()

// Import functions from controller
const { getSettingItems, addSettingItem } = require('../controllers/settingItemController')

// Redirect requests to handler
router.get('/settingItem', getSettingItems)
router.post('/settingItem', addSettingItem)

module.exports = router