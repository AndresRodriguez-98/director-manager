/* const passportLocalMongoose = require('passport-local-mongoose')
DirectorSchema.plugin(passportLocalMongoose) */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DirectorSchema = new mongoose.Schema({
    // aqui los datos del esquema
    dtId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    dtLastName: { type: String, require: true },
    dtSurName: { type: String, require: true },
    dtPlayerList: { type: Array, require: false, null: true },
    money: { type: Number, require: false, default: 3000000},
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

// Hook previo a crear un usuario, para hashear la contraseña y formar un usuario mas seguro:

DirectorSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

// Funcion que nos permite comparar la contraseña que esta en la base de datos con la que viene del request:
DirectorSchema.methods.isValidPassword = async function(password){
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

module.exports = mongoose.model('User', DirectorSchema)