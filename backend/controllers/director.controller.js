/* eslint-disable no-useless-catch */
const User = require('../models/director')
const Player = require('../models/player')

const getAllDts = async (req, res) => {
    const dts = await User.find({}).exec()
    res.json(dts)
}

const getDtById = async (req, res) => {
    /* console.log(req.params.dtId) */ // ACA NOS QUEDAMOS

    const dt = await User.findOne({ dtId: req.params.dtId }).exec()

    if (dt) {
        res.json(dt)
    } else {
        res.status(404).json({ error: 'Director técnico no encontrado' })
    }
}

const createDt = async (req, res) => {
    const { dtLastName, dtSurName, email, password } = req.body

    if (!dtLastName || !dtSurName) {
        return res.status(400).json({ error: 'Se requiere nombre y apellido para crear un DT' })
    }

    const newDt = new User({ dtLastName: dtLastName, dtSurName: dtSurName, email: email, password: password })
    await newDt.save()

    res.status(201).json(newDt)
}

const deleteDt = async (req, res) => {
    const DtToDelete = await User.deleteOne({ dtId: req.params.dtId }).exec()

    if (!DtToDelete) {
        return res.status(404).json({ error: 'Director técnico no encontrado' })
    } else {
        return res.status(200).json({ error: 'Director técnico eliminado correctamente' })
    }
}

/* --- DISPUTA --- */

async function playMatchLogic(director1Id, director2Id) {

    let dt1 = {}
    let dt2 = {}
    try {
        dt1 = await User.findOne({ dtId: director1Id }).exec()
        dt2 = await User.findOne({ dtId: director2Id }).exec()
        if (dt1.dtPlayerList.length < 1 || dt2.dtPlayerList.length < 1) {
            throw new Error({ message: 'Necesitas 6 jugadores para jugar un partido' })
        }
    } catch (err) {
        throw err
    }

    const resultadoAleatorio = Math.floor(Math.random() * 5)

    const resultados = {
        'Ganaste': 1,
        'Ganaste por hat-trick': 2,
        'Perdiste': 3,
        'Perdiste por hat-trick': 4,
        'Empataste': 5
    }

    const resultado = Object.keys(resultados)[resultadoAleatorio]

    const dtGanador = Math.floor(Math.random())

    // Dinero total a repartir en un partido:
    const dineroTotal = 300000

    // Calcular los premios según el resultado:
    // aca nos conviene usar un switch-case ya que queremos evaluar multiples comparacinoes de un solo valor (resultado) contra diferentes casos posibles y ejecutar distinto codigo asociado a una coincidencia.
    let premioGanador, premioPerdedor

    switch (resultado) {
    case 'Ganaste':
        premioGanador = dineroTotal * 0.6
        premioPerdedor = dineroTotal * 0.4
        break
    case 'Ganaste por hat-trick':
        premioGanador = dineroTotal * 0.75
        premioPerdedor = dineroTotal * 0.25
        break
    case 'Perdiste':
        premioGanador = dineroTotal * 0.6
        premioPerdedor = dineroTotal * 0.4
        break
    case 'Perdiste por hat-trick':
        premioGanador = dineroTotal * 0.75
        premioPerdedor = dineroTotal * 0.25
        break
    case 'Empataste':
        premioGanador = dineroTotal * 0.5
        premioPerdedor = dineroTotal * 0.5
        break
    default:
        // En caso de algún resultado no contemplado, asigna premios iguales
        premioGanador = dineroTotal * 0.5
        premioPerdedor = dineroTotal * 0.5
    }

    if (dtGanador === 0) {
        dt1.money += premioGanador
        dt2.money += premioPerdedor
    } else {
        dt2.money += premioGanador
        dt1.money += premioPerdedor
    }

    // guardamos el nuevo dato de money en base de datos, para que no quede en memoria.
    await dt1.save()
    await dt2.save()

    return { resultado: resultado, premioGanador: premioGanador, premioPerdedor: premioPerdedor }
    // TODO: ESTO DEBERIA DEVOLVER UN MATCH, UN MODELO DE MATCH CON TODOS LOS RESULTADOS Y DATOS DEL PARTIDO GUARDADOS
}

// endpoint params: pasarle el id de DT1 Y DT2 como dt1Id y dt2Id
// Prestar atencion a los alcances. Aca no pisamos la variable dt1Id, xq estan en distinto alcance.
const playMatch = async(req, res) => {
    const dt1Id = req.body.dt1Id
    const dt2Id = req.body.dt2Id

    if (!dt1Id || !dt2Id) {
        res.status(400).json({ error: 'Se espera dt1Id y dt2Id para poder jugar' })
    }

    try {
        const resultado = await playMatchLogic(dt1Id, dt2Id)
        res.status(200).json(resultado)
    } catch (e) {
        res.status(400).json(e)
    }
}

/* TRANSFERENCIA (+ IMPORTANTE):*/

const transfer = async(req, res) => {
    const { buyerDTId, playerToTransfer, sellerDTId } = req.body

    let percentageOfRevenue = req.body.percentageOfRevenue ? req.body.percentageOfRevenue : 0
    // El valor de la transferencia está dado por un cálculo entre el precio base del jugador, sus estrellas y EL PORCENTAJE DE GANANCIA DEL DT VENDEDOR
    // ... en el caso de que ya pertenezca a un DT. Si el porcentaje de ganancia es de 0.1, el DT vende al jugador por un 10% más.
    
    let valueTransfer = 0
    let sellerDT = null

    try {
        // Encontrar el jugador en la base de datos
        const player = await Player.findOne({ playerId: playerToTransfer })

        const valueTransferWithDt = (player.basePrice * player.stars) + percentageOfRevenue * (player.basePrice * player.stars)
        const valueTransferWithoutDt = player.basePrice * player.stars
        console.log(valueTransferWithoutDt)

        // Encontrar el DT comprador en la base de datos
        const buyerDT = await User.findOne({ dtId: buyerDTId })

        // CASO 1 (JUGADOR NO PERTENECE A UN DT) Verificar si el jugador existe, pertenece a ningún DT y el DT comprador tiene suficiente presupuesto
        if (!player || !buyerDT) {
            return res.status(404).json({ error: 'No se encontró al DT comprador o al jugador a comprar' })
        }

        // CASO 1 (JUGADOR YA TIENE DT)
        // Corroborar que el DT Vendedor, en el caso que exista, sea el portador del jugador a vender
        if (sellerDTId && sellerDTId !== player.directorId) {
            return res.status(400).json({ error: 'El DT vendedor no tiene al jugador a transferir' })
        }
        else if (sellerDTId && sellerDTId === player.directorId && buyerDT.money >= valueTransferWithDt) {
            valueTransfer = valueTransferWithDt
            sellerDT = await User.findOne({ dtId: sellerDTId })
            if (!sellerDT) {
                return res.status(404).json({ error: 'El DT vendedor no existe' })
            }
            sellerDT.money += valueTransfer
            sellerDT.dtPlayerList = sellerDT.dtPlayerList.filter(item => item.playerId !== player.playerId)
            await sellerDT.save()
        }
        else {
            valueTransfer = valueTransferWithoutDt
        }

        // Transferir el jugador al DT comprador y actualizar presupuestos de DTs
        player.directorId = buyerDTId
        buyerDT.money -= valueTransfer
        buyerDT.dtPlayerList.push(player.playerId)

        // Guardar los cambios en la base de datos
        await player.save()
        await buyerDT.save()

        if (sellerDT) {
            return res.status(200).json({
                mensaje: `${player.fullName} ha sido transferido de ${sellerDT.dtLastName} a ${buyerDT.dtLastName}.`,
                dineroRestanteComprador: buyerDT.money,
                dineroRestanteVendedor: sellerDT.money
            })
        }
        else {
            return res.status(200).json({
                mensaje: `${player.fullName} ha sido transferido a ${buyerDT.dtLastName}.`,
                dineroRestanteComprador: buyerDT.money
            })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ mensaje: 'Error interno del servidor.' })
    }
}

module.exports = {
    getAllDts,
    getDtById,
    createDt,
    deleteDt,
    playMatch,
    transfer
}
