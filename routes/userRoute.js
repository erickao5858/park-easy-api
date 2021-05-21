const express = require('express')
const router = express.Router()

// Import functions from controller
const { register, logout } = require('../controllers/userController')

// Redirect requests to handler
router.post('/register', register)
router.get('/logout', logout)

module.exports = router