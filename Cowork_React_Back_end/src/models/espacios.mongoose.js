const mongoose = require("mongoose")

const espacioSchema = new mongoose.Schema({
    
    //id: {type: Number, required: true, unique: true},
    nombre: {type: String, required: true},
    ubicacion: {type: String, required: true},
    descripcion: {type: String, required: true},
    capacidad: {min: Number, max: Number},
    precio: {type: Number, required: true},
    tipo_arriendo: {type: String, required:true},
    disponible: {type: Boolean, default: true},
    imagen: {type: String},
    caracteristicas: [{type: String}]
    }, {
        timestamps: true   //para tener registro de creacion y actualizacion
    }
)

//crear el modelo
const Espacio = mongoose.model(`Espacio`, espacioSchema)

// Modelo Espacio --->>>>>> mongodb  colección espacios

// obtener todos los espacios

async function obtenerTodosLosEspacios() {
    return await Espacio.find({});
}

async function obtenerEspacioPorId(id){
    return await Espacio.findById(id)
}

async function crearNuevoEspacio(espacio) {
    const nuevoEspacio = Espacio(espacio);
    return await nuevoEspacio.save();
}

module.exports = {
    obtenerTodosLosEspacios,
    obtenerEspacioPorId,
    crearNuevoEspacio
};