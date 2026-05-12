const bcrypt = require('bcrypt');

const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    numero: {type: Number, required: true},
    correo: {type: String, required: true, unique: true},
    constraseña: {type: String, required: true},
    rol: {type: String, default: "user"}
})

//middleware que encripta la contraseña antes de guardar al usuario
usuarioSchema.pre("save", async function () {
    if(!this.isModified("constraseña")) return;
    this.constraseña = await bcrypt.hash(this.constraseña, 10);
})

const Usuario = mongoose.model("Usuario", usuarioSchema);

async function crearNuevoUsuario(usuario) {
    const nuevoUsuario = Usuario(usuario);
    return await nuevoUsuario.save();
}

async function encontrarUsuarioPorCorreo(correo) {
    return await Usuario.findOne({correo: correo})
}

module.exports = {
    crearNuevoUsuario,
    encontrarUsuarioPorCorreo
}