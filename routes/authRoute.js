const express = require('express')
const router = express.Router()
const passport = require('passport')
const Utility = require('../utility')
const jwt = require('jsonwebtoken')
const logger = Utility.getLogger('Auth-google')
const TokenManager = require('ibmcloud-appid').TokenManager
const LZUTF8 = require('lzutf8')

const DEV_MODE = true
const WEB_URL = {
    'PRO': 'https://park-easy-web.mybluemix.net/',
    'DEV': 'http://localhost:3000/'
}
const url = DEV_MODE ? WEB_URL['DEV'] : WEB_URL['PRO']

// TODO: Extract the following strings
// as a function
const tokenManager = new TokenManager({
    clientId: '7adf9cf9-03f9-48a2-8410-c8dec86d9f97',
    secret: 'ODVkZTM5YTYtMzFjNC00NzVjLWE2YjItNDQ1MDhhY2Y3NmZh',
    oauthServerUrl: 'https://us-south.appid.cloud.ibm.com/oauth/v4/aeb1b95f-8570-4c15-bf59-276923ac254c',
})

// Read private key
if (!process.env.PRIVATE_KEY) {
    // If private key not found in process.env
    try {
        // Read private key from local file
        const fs = require('fs')
        privateKey = fs.readFileSync('./private_key.pem')
        if (!privateKey) {
            logger.fatal('Private key not found')
            process.exit(0)
        }
    } catch (e) {
        logger.fatal('Private key not found')
        process.exit(0)
    }
    logger.warn('Private key retrieved but it is stored locally, which is not recommended')
}
else {
    // Use key specified in process.env
    LZUTF8.decompressAsync(process.env.PRIVATE_KEY, { inputEncoding: "Base64", outputEncoding: "String" }, (data, err) => {
        if (err) {
            logger.fatal('Private key cannot be parsed')
            logger.fatal('Private key must be compressed by package LZUTF8 in Base64 format before use')
            process.exit(0)
        }
        privateKey = data
        logger.info('Private key retrieved')
    })
}

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}))

// TODO: Extract authentication as a function

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    const user = req.user
    // Login to appid if user found
    jwt.sign({ name: user.displayName }, privateKey, {
        algorithm: 'RS256',
        issuer: 'Park-Easy-ID',
        subject: user._id.toString(),
        audience: 'https://us-south.appid.cloud.ibm.com/oauth/v4/aeb1b95f-8570-4c15-bf59-276923ac254c',
        expiresIn: '1h'
    }, (err, token) => {
        if (err) {
            logger.fatal('Request failed at function jwt.sign')
            logger.fatal(err)
            const data = JSON.stringify({ success: false, err: { message: 'Service unavailable!', details: err } })
            return res.redirect(url + 'login?data=' + data)
        }
        tokenManager.getCustomIdentityTokens(token).then((authContext) => {
            const data = JSON.stringify({ success: true, token: authContext.identityToken, username: user.displayName })
            return res.redirect(url + 'login?data=' + data)
        })
    })
})

module.exports = router