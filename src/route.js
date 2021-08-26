const express = require('express')
const LinkController = require('./controllers/LinkController')

const route = express.Router()

route.get('/', LinkController.open)

route.get('/shortenerlink', LinkController.shortener)

module.exports = route
