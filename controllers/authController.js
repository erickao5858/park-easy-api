const Utility = require('../utility')
const jwt = require('jsonwebtoken')
const logger = Utility.getLogger('Auth')
const TokenManager = require('ibmcloud-appid').TokenManager

const tokenManager = new TokenManager({
    clientId: process.env.APPID_CLIENT_ID,
    secret: process.env.APPID_CLIENT_SECRET,
    oauthServerUrl: process.env.APPID_OAUTH_SERVER,
})

exports.login = (req, res) => {
    const user = req.user
    // Login to appid if user found
    jwt.sign({ name: user.displayName }, process.env.PRIVATE_KEY, {
        algorithm: process.env.JWT_ALGORITHM,
        issuer: process.env.JWT_ISSUER,
        subject: user._id.toString(),
        audience: process.env.APPID_OAUTH_SERVER,
        expiresIn: process.env.JWT_EXPIRY
    }, (err, token) => {
        if (err) {
            logger.fatal('Failed to sign user jwt')
            logger.fatal(err)
            const data = JSON.stringify({ success: false, err: { message: 'Service unavailable!', details: err } })
            return res.redirect(process.env.WEB_URL + 'login?data=' + data)
        }
        tokenManager.getCustomIdentityTokens(token).then((authContext) => {
            const data = JSON.stringify({ success: true, token: authContext.identityToken, username: user.displayName })
            return res.redirect(process.env.WEB_URL + 'login?data=' + data)
        })
    })
}