const mongoose = require("mongoose")

const reservaSchema = new mongoose.Schema({
    "idEspacio": {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Espacio"},
    "fecha": {type: String, require: true},
    "horaInicio": {type: String, require: true},
    "horaFin": {type: String, require: true},
    "idUsuario": {type: mongoose.Schema.Types.ObjectId, require: true, ref: "Usuario"},
    "estado": {type: String, enum: ["activa", "finalizada", "cancelada"], default: "activa"}
})

const Reserva = mongoose.model("Reserva", reservaSchema);

async function obtenerTodasLasReservas() {
    return await Reserva.find({}).populate("idEspacio",{
        id: 0,
        ubicacion: 0,
        descripcion: 0,
        capacidad: 0,
        precio: 0,
        disponible: 0,
        imagen: 0,
        caracteristicas: 0,
        _id: 0
    }).populate("idUsuario",{
        numero: 0,
        _id:0,
        apellido:0,
        contraseña:0,
        rol:0
    })
}

async function guardarReserva(reserva){
    const nuevaReserva = Reserva(reserva);
    return await nuevaReserva.save();
}

async function buscarReserva(idEspacio, fecha, horaInicio, horaFin) {
    return await Reserva.findOne({
        idEspacio: idEspacio,
        fecha: fecha,
        horaInicio: {$lt: horaFin},
        horaFin: {$gt: horaInicio},
        estado: "activa"
    })
}

async function obtenerReservaId(idReserva){
    return await Reserva.findById(idReserva);
}

async function actualizarEstadoReserva(idReserva, nuevoEstado){
    return await Reserva.findByIdAndUpdate(idReserva, { estado: nuevoEstado}, { new:true})
}

async function obtenerReservasUsuario(idUsuario){
    return await Reserva.find({idUsuario: idUsuario})
    .populate("idEspacio",{
        id: 0,
        ubicacion: 0,
        descripcion: 0,
        capacidad: 0,
        precio: 0,
        disponible: 0,
        imagen: 0,
        caracteristicas: 0,
        _id: 0
    }).populate("idUsuario",{
        _id:0,
        apellido:0,
        contraseña:0,
        rol:0
    })
}

module.exports = {
    obtenerTodasLasReservas,
    guardarReserva,
    buscarReserva,
    actualizarEstadoReserva,
    obtenerReservaId,
    obtenerReservasUsuario
}