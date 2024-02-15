const express = require('express')
// eslint-disable-next-line new-cap
const dtRouter = express.Router()
const directorsController = require('../controllers/director.controller')
const verifyToken = require('../middleware/authMiddleware')

/* const director = require('../models/director') */

// TODO: Agregar middlewares para validaciones

// const t = transaccion

// Lógica para comprar un jugador
dtRouter.post('/buy-player', async(req, res) =>{
    const { directorId, playerId } = req.body
    try{
        const director = directorId
        const player = playerId
    
        if (player.directorId) throw new Error('Ya fue comprado por alguien más')
    
        const totalPrice = player.basePrice * player.stars
        const money = parseFloat(director.money)
    
        if (totalPrice > money) throw new Error('Fondos insuficientes')
    
        director.money = money - totalPrice
    
        res.json({ director, player })
    }catch (err) {
        console.log(err)
    }
})


dtRouter.get('/', verifyToken, directorsController.getAllDts)
dtRouter.get('/:dtId', verifyToken, directorsController.getDtById)
dtRouter.post('/', verifyToken, directorsController.createDt)
dtRouter.delete('/:dtId', verifyToken, directorsController.deleteDt)
dtRouter.post('/play-match', verifyToken, directorsController.playMatch)
dtRouter.post('/transfer', verifyToken, directorsController.transfer)
module.exports = dtRouter