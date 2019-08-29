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

        const { nombre, direccion } = req.body;

        const estadioNew = new estadio({
            nombre,
            direccion
        });

        await estadioNew.save((err, result) => {
            if(err){
                sendRes(res, 500, 'Error al intentar guardar el estadio', null, err);
            }
            else{
                sendRes(res, 200, 'Estadio agregado con exito!', result, null);
            }
        });
    } catch(err) {
        return next(err)
    }
}
