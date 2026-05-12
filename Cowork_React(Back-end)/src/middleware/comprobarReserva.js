const { obtenerReservas } = require("../models/reservas.models")
const { connect } = require("../database/mongoose")
const { obtenerReservaId } = require("../models/reservas.mongoose")

const comprobarReserva = async (req, res, next) => {

    const { idReserva } = req.params;

    const reservas = await obtenerReservas();

    try{
        await connect();
        const existeReserva = await obtenerReservaId(idReserva)

        if(!existeReserva){
            return res.status(404).json({
                msg: "Reserva no existe"
            })
        }

        next();

    }catch(error){
        next(error);
    }
}

module.exports = comprobarReserva