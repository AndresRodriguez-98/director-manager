const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/director')

// Requerimientos para desp verificar el token:
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// Middlewares de autenticación:
// primero vamos a modificar los valores por defecto q espera passport y luego ejecutar una funcion de callback:
passport.use('signup', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    try {
        const newDt = new User({ dtLastName: dtLastName, dtSurName: dtSurName, email: email, password: password })
        await newDt.save()
        return done(null, newDt)
    } catch (e) {
        return done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
            return done(null, false, { message: 'Usuario o contraseña incorrecta' })
        }

        return done(null, user, { message: 'Ingresaste correctamente al GranDt' })
    } catch (e) {
        return done(e)
    }
}))

// Middleware para comprobar el token:

passport.use(new JWTStrategy({
    secretOrKey: 'top-secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(e)
    }
}
))