const express = require('express')

const usersController = require('./controllers/usersController')

const routes = express.Router()

routes.get('/api/users', usersController.index)
routes.get('/api/users/:id', usersController.get)
routes.post('/api/users', usersController.create)
routes.put('/api/users/:id', usersController.update)
routes.delete('/api/users/:id', usersController.remove)
routes.delete('/api/users', usersController.clear)

module.exports = routes
