const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugador = mongoose.model('jugador');

module.exports = async (req, res, next) => {
    try {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(boom.badRequest('Error al validar los datos ingresados', errors));
        }

        let { nombre, fechaNac, equipo, goles } = req.body;

        let jugadorNew = new jugador({
            nombre,
            fechaNac,
            equipo,
            goles
        });

        await jugadorNew.save((err, result) => {
            if(err){
                next(boom.badImplementation('Error al intentar guardar el jugador', err));
            }
            else{
                sendRes(res, 200, 'Jugador agregado con exito!', result);
            }
        });
    } catch(err) {
        return next(err)
    }
}
