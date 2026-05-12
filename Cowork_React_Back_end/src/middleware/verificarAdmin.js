const verificarAdmin = (req, res, next) => {
    
    if(!req.user){
        return res.status(401).json({
            msg:"Usuario no autenticado!!"
        })
    }

    if(req.user.rol !== "admin"){
        return res.status(403).json({
            msg: "Acceso denegado"
        })
    }

    next();
}

module.exports = verificarAdmin