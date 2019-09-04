const { validationResult } = require('express-validator');
const sendRes = require('../../utils/sendResponse');
const mongoose = require('mongoose');
const jugador = mongoose.model('jugador');

module.exports = async (req, res, next) => {
    try {
        let errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            sendRes(res, 400, 'Error al validar los datos ingresados', null, errors);
        }

        let { nombre, fechaNac, equipo, goles } = req.body;

        let jugadorNew = new jugador({
            nombre,
            fechaNac,
            equipo,
            goles
        });

        await jugadorNew.save((err, result) => {
            if(err){
                sendRes(res, 500, 'Error al intentar guardar el jugador', null, err);
            }
            else{
                sendRes(res, 200, 'Jugador agregado con exito!', result, null);
            }
        });
    } catch(err) {
        return next(err)
    }
}
