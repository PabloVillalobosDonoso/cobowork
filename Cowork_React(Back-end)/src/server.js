//cargar env, metodo más robusto para poder usar nodemon e iniciar el proyecto con npm run start
require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env")
})

// Levantar el servidor
const app = require("./app");
const { connect } = require("./database/mongoose");

const PORT = process.env.PORT || 3000;


try{
    connect();
    app.listen(PORT, ()=> {
    console.log(`Servidor CoWork corriendo en http://localhost:${PORT}`)
})
}catch(error){
    console.error(error);
}

