const fs = require("fs/promises");
const path = require("path");
const { json } = require("stream/consumers");

const rutaReservas = path.join(__dirname,"../../data/reservas.json");

//leer el json
const leerReservas  = async () => {
    const data = await fs.readFile(rutaReservas, "utf8");
    return JSON.parse(data)
}

//escribir el json
const escribirReservas = async (reservas) => {
    await fs.writeFile(rutaReservas, JSON.stringify(reservas, null, 2), "utf8");
}

const obtenerReservas = async () => {
    return await leerReservas();
}

const crearReservas = async (nuevaReserva) => {
    const reservas = await leerReservas();
    reservas.push(nuevaReserva);
    await escribirReservas(reservas);
    return nuevaReserva;
}

const obtenerLargoReservas = async () => {
    const data = leerReservas();
    const cantidadReservas = JSON.parse(data);
    return cantidadReservas.length
}

const actualizarReservas = async (reservas) => {
    await escribirReservas(reservas);
    return reservas
}

module.exports = {
    obtenerReservas,
    crearReservas,
    obtenerLargoReservas,
    actualizarReservas
}