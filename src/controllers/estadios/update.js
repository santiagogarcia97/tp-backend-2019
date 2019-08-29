const { validationResult } = require('express-validator');
const sendRes = require('../../utils/sendResponse');
const mongoose = require('mongoose');
const estadio = mongoose.model('estadio');

module.exports = async (req, res, next) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            sendRes(res, 400, 'Error al validar los datos ingresados', null, errors);
        }

        await estadio.findById(req.params.id).
        exec((err, result) => {
            if (err) {
                sendRes(res, 500, 'Error al intentar actualizar el estadio', null, err);
            }
            else if (result) {
                result.nombre = req.body.nombre || result.nombre;
                result.direccion = req.body.direccion || result.direccion;
                result.save((err, result) => {
                    if(err) {
                        sendRes(res, 500, 'Error al intentar actualizar el estadio', null, err);
                    }
                    else {
                        sendRes(res, 200, 'Estadio modificado con exito!', result, null);
                    }
                });
            }
            else {
                sendRes(res, 200, 'El estadio no existe', null, null);
            }
        });
    } catch(err) {
        return next(err)
    }
}
