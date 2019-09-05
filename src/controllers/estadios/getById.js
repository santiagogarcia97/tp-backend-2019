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
                    next(boom.badImplementation('Error al intentar recuperar estadio', err));
                }
                else if(result != null) {
                    sendRes(res, 200, 'Estadio recuperado con exito!');
                }
                else {
                    sendRes(res, 200, 'El estadio no existe');
                }
            });
    } catch(err) {
        return next(err)
    }
}
