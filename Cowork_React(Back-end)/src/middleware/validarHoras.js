const convertirMinutos = (hora) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
};

const validarHoras = async (req, res, next) => {
    const { horaInicio, horaFin } = req.body;

    try{
        if(convertirMinutos(horaFin) <= convertirMinutos(horaInicio)){
            return res.status(409).json({
                msg:"La hora de termino debe ser mayor que la hora de inicio"
            });
        }
        next();
    }catch(error){
        next(error)
    }
}

module.exports = validarHoras