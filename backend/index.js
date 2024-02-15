const express = require('express')
const app = express()
const playersRoutes = require('./routes/player.routes')
const directorsRoutes = require('./routes/director.routes')
const authRoutes = require('./routes/auth.routes')
const mongoose = require('mongoose')

app.set('PORT', 3000)

app.use(express.json())

// Rutas para auth
app.use('/auth', authRoutes)

// Rutas para jugadores
app.use('/players', playersRoutes)

// Rutas para directores
app.use('/directors', directorsRoutes)

const port = app.get('PORT')
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})

// cadena de conexión

// FORMA ANTIGUA DE CONECTAR CON MONGOOSE:
/* mongoose.connect('mongodb://127.0.0.1:27017/gran-dt', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}) */

// NUEVA MANERA DE CONECTAR CON MONGOOSE:
main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/gran_dt')
}