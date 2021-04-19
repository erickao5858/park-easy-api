/** Read Strings */
const strings = require('./strings.json')

/** Enalbe CORS */
const cors = require('cors')

/** Express Setup */
const express = require('express')
const app = express()

app.use(cors())
app.use(express.static(__dirname))

const bodyParser = require('body-parser')
const expressSession = require('express-session')({
    secret: 'parkeasy',
    resave: false,
    saveUninitialized: false
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(strings.SERVER_STARTED, port))

/** Passport Setup */
const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())

/** Mongoose Setup */
const mongoConnect = require('./mongo-connect')

/** Routes */
const userRoute = require('./routes/userRoute')
app.use('/', userRoute)