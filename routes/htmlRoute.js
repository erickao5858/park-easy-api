const express = require('express')
const router = express.Router()

const htmlLocation = './public/html'

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: htmlLocation })
})

module.exports = router