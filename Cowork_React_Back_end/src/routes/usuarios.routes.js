const express = require("express");
const { registrar, iniciarSesion } = require("../controllers/usuarios.controllers")

const router = express.Router();

router.post("/registro", registrar);
router.post("/inicioSesion",iniciarSesion);

module.exports = router;