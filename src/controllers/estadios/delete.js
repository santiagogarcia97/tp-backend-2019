const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadio = mongoose.model('estadio');

module.exports = async (req, res, next) => {
    try {
        let errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            next(boom.badRequest('Error al validar los datos ingresados', errors));
        }

        await estadio.findById(req.params.id).
        exec((err, result) => {
            if (err) {
                next(boom.badImplementation('Error al intentar eliminar el estadio', err));
            }
            else if (result) {
                result.remove((err, result) => {
                    if(err) {
                        next(boom.badImplementation('Error al intentar eliminar el estadio', err));
                    }
                    else {
                        sendRes(res, 200, 'Estadio eliminado con exito!', result);
                    }
                });
            }
            else {
                sendRes(res, 200, 'El estadio que intenta eliminar no existe');
            }
        });
    } catch(err) {
        return next(err)
    }
}
