const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    // aqui los datos del esquema\
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
        unique: true
    },
    fullName: { type: String, require: true },
    mainFoot: { type: String, require: true },
    basePrice: { type: Number, require: true },
    stars: { type: Number, default: 1},
    directorId: { type:String, require: false }
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player