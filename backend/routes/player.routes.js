const express = require('express')
// eslint-disable-next-line new-cap
const playerRouter = express.Router()
const playersController = require('../controllers/player.controller')
const verifyToken = require('../middleware/authMiddleware')

// TODO: Agregar middlewares para validaciones

playerRouter.get('/', verifyToken, playersController.getAllPlayers)
playerRouter.get('/:playerId', verifyToken, playersController.getPlayerById)
playerRouter.post('/', verifyToken, playersController.createPlayer)
playerRouter.delete('/:playerId', verifyToken, playersController.deletePlayer)

module.exports = playerRouter