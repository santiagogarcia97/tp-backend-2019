const { validationResult } = require('express-validator');
const sendRes = require('../../utils/sendResponse');
const mongoose = require('mongoose');
const jugador = mongoose.model('jugador');

module.exports = async (req, res, next) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            sendRes(res, 400, 'Error al validar los datos ingresados', null, errors);
        }

        await jugador.find().
            exec( (err, result) => {
                if (err) {
                    sendRes(res, 500, 'Error al intentar recuperar jugadores', null, err);
                }
                else if (result.length != 0) {
                    sendRes(res, 200, 'Jugadores recuperados con exito!', result, null);
                }
                else {
                    sendRes(res, 200, 'No existe ningun jugador', null, null);
                }
        });
    } catch(err) {
        return next(err)
    }
}
