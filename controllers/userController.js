const passport = require('passport')
const User = require('../models/user')
const Utility = require('../utility')
const jwt = require('jsonwebtoken')
const logger = Utility.getLogger('User')
const TokenManager = require('ibmcloud-appid').TokenManager
const LZUTF8 = require('lzutf8')

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

exports.login = (req, res, next) => {
    // Authenticate user with local strategy
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            logger.error('Request failed at function passport.authenticate')
            return next(err)
        }
        // User not found
        if (!user) {
            return res.json({ success: false, err: { message: 'The username or password appears to be incorrect!' } })
        }
        // Login to appid if user found
        jwt.sign({ name: user.username }, privateKey, {
            algorithm: 'RS256',
            issuer: 'Park-Easy-ID',
            subject: user._id.toString(),
            audience: 'https://us-south.appid.cloud.ibm.com/oauth/v4/aeb1b95f-8570-4c15-bf59-276923ac254c',
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                logger.fatal('Request failed at function jwt.sign')
                logger.fatal(err)
                return res.json({ success: false, err: { message: 'Service unavailable!', details: err } })
            }
            tokenManager.getCustomIdentityTokens(token).then((authContext) => {
                return res.json({ success: true, token: authContext.identityToken, username: user.username })
            })
        })
    })(req, res, next)
}

exports.register = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // Register user with credentials
    User.register({ username: username, active: false }, password, (err) => {
        if (err) {
            logger.error('Request failed at function User.register')
            return res.json({ success: false, err: err })
        }
        return res.json({ success: true })
    })
}

exports.isUserExists = (userID, callback) => {
    User.findOne({ _id: userID }, callback)
}