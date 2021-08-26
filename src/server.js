const express = require('express')
const route = require('./route')
const path = require('path')
// const cors = require('cors')

const server = express()

server.set('view engine', 'ejs')

server.use(express.static('public'))

// server.use(cors())

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true }))

server.use(route)

server.listen(3000, () => console.log('Server running on port 3000'))
