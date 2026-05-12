//const { obtenerReservas } = require("../models/reservas.models")
const { buscarReserva } = require("../models/reservas.mongoose")
const { connect } = require("../database/mongoose")

const validarConflicto = async (req, res, next) => {

    const { idEspacio, fecha, horaInicio, horaFin } = req.body;

    try{
        await connect();
        const existeReserva = await buscarReserva(idEspacio, fecha, horaInicio, horaFin);

        if(existeReserva){
            console.log(existeReserva)
            return res.status(400).json({
                msg: "El espacio ya esta reservado para esa hora"
            })
        }

        next();

    }catch(error){
        next(error);
    }

}

module.exports = validarConflicto


/* VERSION CON JSON SIN MONGODB

const {horaInicio , horaFin, fecha, IdEspacio} = req.body;

    try{
        const reservas = await obtenerReservas();

        const conflicto = reservas.some(
            reserva => 
                reserva.IdEspacio === IdEspacio && 
                reserva.fecha === fecha &&
                reserva.horaInicio < horaFin &&
                reserva.horaFin > horaInicio &&
                reserva.estado === "confirmada"
            )
        if(conflicto){
            return res.status(400).json({
                msg: "Espacio ocupado en el horario seleccionado"
            })
        }

        next();

    }catch(error){
        next(error)
    }

*/