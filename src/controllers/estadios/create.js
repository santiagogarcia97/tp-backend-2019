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

        let { nombre, direccion } = req.body;

        let estadioNew = new estadio({
            nombre,
            direccion
        });

        await estadioNew.save((err, result) => {
            if(err){
                next(boom.badImplementation('Error al intentar guardar el estadio', err));
            }
            else{
                sendRes(res, 200, 'Estadio agregado con exito!', result);
            }
        });
    } catch(err) {
        return next(err)
    }
}
