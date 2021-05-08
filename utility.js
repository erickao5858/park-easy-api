// JSON web key
const jwksClient = require('jwks-rsa')
const client = jwksClient({
    jwksUri: 'https://us-south.appid.cloud.ibm.com/oauth/v4/aeb1b95f-8570-4c15-bf59-276923ac254c/publickeys'
})

getPublicKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey
        return callback(null, signingKey)
    })
}

const jwt = require('jsonwebtoken')

exports.verifyToken = (token, callback) => {
    if (!token) {
        return callback({ message: 'Token not provided!' })
    }
    jwt.verify(token, getPublicKey, (err, decoded) => {
        return callback(err, decoded)
    })
}

const log4js = require('log4js')

exports.getLogger = (category) => {
    const logger = log4js.getLogger(category)
    logger.level = 'debug'
    return logger
}