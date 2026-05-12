const fs = require("fs/promises");
const path = require("path");

const rutaEspacios = path.join(__dirname,"../../data/espacios.json");

const leerEspacios  = async () => {
    const data = await fs.readFile(rutaEspacios, "utf8");
    return JSON.parse(data)
}
const escribirespacios = async (reservas) => {
    await fs.writeFile(rutaEspacios, JSON.stringify(reservas, null, 2), "utf8");
}

const obtenerEspacios = async () => {
    return await leerEspacios();
}



module.exports = {
    obtenerEspacios
}