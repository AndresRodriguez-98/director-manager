const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
    // aqui los datos del esquema\
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
        unique: true
    },
    directorId1: { type:String, require: false },
    directorId2: { type:String, require: false },
    date: { type: mongoose.Schema.Types.Date, auto: true, unique:true }
})

const Match = mongoose.model('Match', MatchSchema)

module.exports = Match