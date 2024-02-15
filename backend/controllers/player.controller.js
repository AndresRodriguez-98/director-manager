const Player = require('../models/player')

const getAllPlayers = async(req, res) => {
    const players = await Player.find({}).exec()
    res.json(players)
}

const getPlayerById = async(req, res) => {

    const player = await Player.findOne({ playerId: req.params.playerId }).exec()

    if (player) {
        res.json(player)
    } else {
        res.status(404).json({ error: 'Director técnico no encontrado' })
    }
}

const createPlayer = async(req, res) => {
    const { fullName, mainFoot, basePrice, stars } = req.body

    if (!fullName || !mainFoot || !basePrice) {
        return res.status(400).json({ error: 'Se requiere nombre, pie habil y precio para crear un jugador' })
    }

    const newPlayer = new Player({ fullName: fullName, mainFoot: mainFoot, basePrice: basePrice, stars: stars })

    await newPlayer.save()

    res.status(201).json(newPlayer)
}

const deletePlayer = async(req, res) => {

    const playerToDelete = await Player.deleteOne({ playerId: req.params.playerId }).exec()

    if (!playerToDelete) {
        return res.status(404).json({ error: 'Jugador no encontrado' })
    }else{
        return res.status(200).json({ error: 'Jugador eliminado correctamente' })
    }

}

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    deletePlayer,
}
 