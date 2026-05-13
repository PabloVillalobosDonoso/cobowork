const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const espaciosRoutes = require("./routes/espacios.routes");
const reservasRoutes = require("./routes/reservas.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

//importar controlador


// Middleware para parsear JSON
const app = express();

//middlewares incorporados(express) y de terceros
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//rutas
app.get(`/`,(req, res) => {
    res.send("Bienvenido a CoWorkAPI de CTRL ALT ELITE");
})

//rutas espacios
app.use("/espacios", auth, espaciosRoutes);

//rutas reservas
app.use("/reservas", auth, reservasRoutes);

//ruta usuarios
app.use("/usuario", usuariosRoutes);

//manejo de errores
app.use(notFound); //rutas no encontradas
app.use(errorHandler);  //sobreeescribir errores en express


module.exports = app;