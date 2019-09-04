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

        await jugador.findById(req.params.id).
        exec((err, result) => {
            if (err) {
                sendRes(res, 500, 'Error al intentar actualizar el jugador', null, err);
            }
            else if (result) {
                result.nombre = req.body.nombre || result.nombre;
                result.fechaNac = req.body.fechaNac || result.fechaNac;
                result.equipo = req.body.equipo || result.equipo;
                result.goles = req.body.goles || result.goles;

                result.save((err, result) => {
                    if(err) {
                        sendRes(res, 500, 'Error al intentar actualizar el jugador', null, err);
                    }
                    else {
                        sendRes(res, 200, 'Jugador modificado con exito!', result, null);
                    }
                });
            }
            else {
                sendRes(res, 200, 'El jugador no existe', null, null);
            }
        });
    } catch(err) {
        return next(err)
    }
}
