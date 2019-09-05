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

        await estadio.find().
            exec( (err, result) => {
                if (err) {
                    next(boom.badImplementation('Error al intentar recuperar estadios', err));
                }
                else if (result.length != 0) {
                    sendRes(res, 200, 'Estadios recuperados con exito!', result);
                }
                else {
                    sendRes(res, 200, 'No existe ningun estadio');
                }
        });
    } catch(err) {
        return next(err)
    }
}
