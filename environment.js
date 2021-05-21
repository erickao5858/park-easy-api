//  Logger
const Utility = require('./utility')
const logger = Utility.getLogger('Environment')

require('dotenv').config()
const KEYS = [
    'DB_CONNECTION_STRING',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL',
    'FACEBOOK_CLIENT_ID',
    'FACEBOOK_CLIENT_SECRET',
    'FACEBOOK_CALLBACK_URL',
    'APPID_CLIENT_ID',
    'APPID_CLIENT_SECRET',
    'APPID_OAUTH_SERVER',
    'JWT_ALGORITHM',
    'JWT_ISSUER',
    'JWT_EXPIRY',
    'WEB_URL',
    'PRIVATE_KEY'
]
KEYS.forEach((key) => {
    if (!process.env[key]) {
        logger.fatal('Enviornment variable ' + key + ' not found')
        process.exit(0)
    }
})

process.env.PRIVATE_KEY = Buffer.from(process.env.PRIVATE_KEY, 'base64')