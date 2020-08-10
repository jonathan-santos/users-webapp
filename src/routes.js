const express = require('express')

const usersController = require('./controllers/usersController')

const routes = express.Router()

routes.get('/api/users', usersController.index)
routes.get('/api/users/:id', usersController.get)

module.exports = routes
