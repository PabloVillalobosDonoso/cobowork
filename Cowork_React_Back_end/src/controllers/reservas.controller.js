//const { obtenerReservas, crearReservas, obtenerLargoReservas, actualizarReservas } = require("../models/reservas.models.js")
const { connect } = require("../database/mongoose.js")
const {obtenerTodasLasReservas, guardarReserva, buscarReserva, actualizarEstadoReserva, obtenerReservasUsuario } = require("../models/reservas.mongoose.js")
const mostrarReservas = async (req, res ) => {
    try{
        await connect();
        const reservas = await obtenerTodasLasReservas();
        res.status(200).json(reservas);
    }catch(error){
        console.log("error", error);
        res.status(500).json({
            msg: "error del servidor"
        })
    }

    //VERSION CON JSON
    // try{
    //     const reservas = await obtenerReservas();
    //     res.status(200).json(reservas);
    // } catch(error){
    //     console.log("error", error);
    //     res.status(500).json({
    //         msg: "error del servidor"
    //     })
        
    // }
}

const crearReserva = async (req, res, next) => {
    const {idEspacio, fecha, horaInicio, horaFin, idUsuario} = req.body;

    try {
        await connect
        const nuevaReserva = {
            idEspacio,
            fecha,
            horaInicio,
            horaFin,
            idUsuario
        }

        const reservaCreada = await guardarReserva(nuevaReserva);

        res.status(201).json({
            msg: "Reserva creda con exito!",
            reservaCreada
        })

    }catch(error){
        next(error)
    }
}

const cambiarEstadoReserva= async (req, res, next) => {
    const { idReserva } = req.params;
    const { nuevoEstado} = req.body;

    try{

        await connect();
        const reservaActualizada = await actualizarEstadoReserva(idReserva, nuevoEstado);
        res.status(200).json({
            msg: "Reserva actualizada con exito!",
            reservaActualizada
        })

    }catch(error){
        next(error);
    }
}

const obtenerReservasDeUsuario = async (req, res, next) =>{
    const { idUsuario } =req.params;

    try{
        await connect();
        const reservasUsuario = await obtenerReservasUsuario(idUsuario);
        res.status(200).json(reservasUsuario);

    }catch(error){
        next(error);
    }
}
/*
const eliminarReservaPorId = async (req, res, next) => {
    const { id } = req.params;

    try{
        const reservas = await obtenerReservas();
        const nuevasReservas = reservas.filter(reserva => reserva.id !== id)
        await actualizarReservas(nuevasReservas);
        res.status(200).json({
            msg: `Reserva eliminada con exito `,
            nuevasReservas
        });
    }catch(error){
        next(error)
    }
}

const actualizarReserva = async (req, res, next) => {
    const { id } = req.params;
    const {horaInicio , horaFin, fecha, IdEspacio} = req.body;

    try{
        const reservas = await obtenerReservas();

        const nuevasReservas = reservas.map(reserva => {
            if(reserva.id === id ){
                return {
                    ...reserva,
                    horaInicio,
                    horaFin,
                    fecha,
                    IdEspacio
                };
            }
            return reserva;
        })

        await actualizarReservas(nuevasReservas);
        res.status(200).json({
            msg: `Reserva actualizada`,
            nuevasReservas
        });

        
    }catch(error){
        next(error);
    }
}
*/
module.exports = {
    mostrarReservas,
    crearReserva,
    cambiarEstadoReserva,
    obtenerReservasDeUsuario
}