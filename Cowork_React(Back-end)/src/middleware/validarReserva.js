const { obtenerEspacios } = require("../models/espacios.models");
const { obtenerEspacioPorId } = require("../models/espacios.mongoose");
const { connect } = require("../database/mongoose");

const validarReserva = async (req, res, next) => {

    const {idEspacio, fecha, horaInicio, horaFin, idUsuario} = req.body;

    //validacion de campos
    if(!idEspacio || !fecha || !horaInicio || !horaFin || !idUsuario){
        return res.status(400).json({
            msg: "Por favor llene todos los campos"
        })
    }

    try{
        //validar espacio
        await connect();
        const ExisteEspacio = await obtenerEspacioPorId(idEspacio);

        if(!ExisteEspacio) {
            return res.status(404).json({
                msg: "El espacio no existe"
            })
        }

    }catch(error){
        return next(error)
    }

    next();
}

module.exports = validarReserva;