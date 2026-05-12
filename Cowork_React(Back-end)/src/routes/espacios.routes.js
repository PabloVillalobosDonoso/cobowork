const express = require("express");
const { mostrarEspacios, crearEspacios, mostrarEspacioId } = require("../controllers/espacios.controllers");
const verificarAdmin = require("../middleware/verificarAdmin");

const router = express.Router();

router.get("/", mostrarEspacios)
router.get("/:idEspacio", mostrarEspacioId)

router.post("/", verificarAdmin, crearEspacios);

module.exports = router