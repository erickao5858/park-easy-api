const express = require('express')
const router = express.Router()
const { login } = require('../controllers/authController')

const passport = require('passport')
const AUTH_OPTIONS = { failureRedirect: process.env.WEB_URL + 'login?data=' + JSON.stringify({ success: false, err: { message: 'Action cancelled or credentials not match!' } }) }

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/redirect', passport.authenticate('google', AUTH_OPTIONS), login)

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/redirect', passport.authenticate('facebook', AUTH_OPTIONS), login)

router.post('/auth/local', passport.authenticate('local', AUTH_OPTIONS), login)

module.exports = router