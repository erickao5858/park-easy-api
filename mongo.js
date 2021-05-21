/** Mongoose Setup */
const mongoose = require('mongoose')
const passport = require('passport')

//  Logger
const Utility = require('./utility')
const logger = Utility.getLogger('Database')

// Connect to database
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    // Error occurs
    if (err) {
        logger.fatal('Cannot establish a connection with database')
        logger.fatal(err)
        process.exit(0)
    }
})

mongoose.connection.on('open', () => {
    logger.info('Connection established successfully')
})