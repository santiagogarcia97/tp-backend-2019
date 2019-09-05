const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadio = mongoose.model('estadio');

module.exports = async (req, res, next) => {
    try {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(boom.badRequest('Error al validar los datos ingresados', errors));
        }

        await estadio.findById(req.params.id).
        exec((err, result) => {
            if (err) {
                next(boom.badImplementation('Error al intentar actualizar el estadio', err));
            }
            else if (result) {
                result.nombre = req.body.nombre || result.nombre;
                result.direccion = req.body.direccion || result.direccion;
                result.save((err, result) => {
                    if(err) {
                        next(boom.badImplementation('Error al intentar actualizar el estadio', err));
                    }
                    else {
                        sendRes(res, 200, 'Estadio modificado con exito!', result);
                    }
                });
            }
            else {
                sendRes(res, 200, 'El estadio no existe');
            }
        });
    } catch(err) {
        return next(err)
    }
}
