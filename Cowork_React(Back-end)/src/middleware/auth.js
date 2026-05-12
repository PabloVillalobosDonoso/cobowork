const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            msg:"Se requiere Token de atuenticacion"
        })
    }

    //split
    const token = authHeader.split(" ")[1];

    try{

        const playload = jwt.verify(token, process.env.SECRET_KEY);

        // pasar información del usuario al siguiente middleware o controlador
        req.user = playload;

        next();

    }catch(error){
        error.message = "Error con el token"
        next(error)
    }
}

module.exports = auth