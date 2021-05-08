/** Mongoose Setup */
const mongoose = require('mongoose')
const passport = require('passport')

//  Logger
const Utility = require('./utility')
const logger = Utility.getLogger('Mongo-connect')

let db_url
// Read db connection string
if (!process.env.DB_CONNECTION_STRING) {
    // If db connection string not found in process.env
    try {
        // Read db connection string from configuration file
        const { DB_CONNECTION_STRING } = require('./EVs')
        if (!DB_CONNECTION_STRING) {
            logger.fatal('Enviornment variable "DB_CONNECTION_STRING" not found')
            process.exit(0)
        }
        db_url = DB_CONNECTION_STRING
    } catch (e) {
        logger.fatal('Enviornment variable "DB_CONNECTION_STRING" not found')
        process.exit(0)
    }
    logger.warn('Environment variable "DB_CONNECTION_STRING" is stored locally, which is not recommended')
}
else {
    // Use string specified in process.env
    db_url = process.env.DB_CONNECTION_STRING
}
// Connect to database
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    // Error occurs
    if (err) {
        logger.fatal('Cannot establish a connection with database')
        process.exit(0)
    }
})

mongoose.connection.on('open', () => {
    logger.info('Connection established successfully')
})

const User = require('./models/user')

/** Passport Local Authentication */

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())