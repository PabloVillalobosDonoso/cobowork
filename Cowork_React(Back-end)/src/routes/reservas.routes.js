const express = require("express");
const { mostrarReservas, crearReserva, cambiarEstadoReserva, obtenerReservasDeUsuario } = require("../controllers/reservas.controller")
const validarReserva = require("../middleware/validarReserva");
const validarConflicto = require("../middleware/validarConflicto");
const comprobarReserva = require("../middleware/comprobarReserva");
const validarHoras = require("../middleware/validarHoras");
const verificarAdmin = require("../middleware/verificarAdmin");

const router = express.Router();

router.get("/",verificarAdmin, mostrarReservas);
router.post("/",validarHoras ,validarReserva,validarConflicto,crearReserva);
router.put("/:idReserva", comprobarReserva, cambiarEstadoReserva);
router.get("/usuario/:idUsuario", obtenerReservasDeUsuario)
//router.delete("/:id",comprobarReserva,eliminarReservaPorId);
//router.put("/:id",comprobarReserva,validarHoras,validarConflicto,actualizarReserva);

module.exports = router