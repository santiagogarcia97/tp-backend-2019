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
                    sendRes(res, 500, 'Error al intentar recuperar estadios', null, err);
                }
                else if(result != null) {
                    sendRes(res, 200, 'Estadio recuperado con exito!', result, null);
                }
                else {
                    sendRes(res, 200, 'El estadio no existe', null, null);
                }
            });
    } catch(err) {
        return next(err)
    }
}