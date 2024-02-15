const express = require('express')
const authRouter = express.Router()
const User = require('../models/director')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// User registration
authRouter.post('/register', async (req, res) => {
    try {
        const { email, password, dtSurName, dtLastName } = req.body
        /*         const hashedPassword = await bcrypt.hash(password, 10) */
        const user = new User({ email, password: password, dtLastName: dtLastName, dtSurName: dtSurName })
        await user.save()
        res.status(201).json({ message: 'Usuario registrado correctamente' })
    } catch (error) {
        res.status(400).json({ error: 'Falló el registro de usuario' })
    }
})

// User login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Fallo en la autenticación' })
        }
        const token = jwt.sign({ dtId: user.dtId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        })
        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Falló el login' })
    }
})

module.exports = authRouter