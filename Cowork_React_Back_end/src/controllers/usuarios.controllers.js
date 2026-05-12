const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { crearNuevoUsuario, encontrarUsuarioPorCorreo } = require("../models/usuarios.mongoose")
const { connect } = require("../database/mongoose");

const registrar = async (req, res, next) => {

    try{
        const { nombre, apellido, numero, correo, constraseña } = req.body;

        await connect();

        const usuario = await crearNuevoUsuario({ nombre, apellido, numero, correo, constraseña });

        res.status(201).json({
            msg: "Usuario creado",
            id: usuario._id
        })
    }catch(error){
        next(error);
    }
}

const iniciarSesion = async (req, res, next) => {
    try{
        const { correo, constraseña } = req.body;

        //validaciones

        //verificar correo
        await connect();
        const usuario = await encontrarUsuarioPorCorreo(correo);

        if(!usuario){
            return res.status(404).json({
                msg: "Usuario no existe"
            })
        }

        //verificar contraseña
        const constraseñaValidada = await bcrypt.compare(constraseña, usuario.constraseña);

        if(!constraseñaValidada){
            return res.status(401).json({
                msg:"Contraseña incorrecta"
            })
        }

        //token de acceso
        const token = jwt.sign({id:usuario._id, correo:usuario.correo, rol:usuario.rol, nombre:usuario.nombre, numero:usuario.numero}, process.env.SECRET_KEY, {expiresIn: "8h"})

        res.status(200).json({
            msg:"Sesion iniciada",
            token: token
        })

    }catch(error){
        next(error)
    }
}

module.exports = {
    registrar,
    iniciarSesion
}