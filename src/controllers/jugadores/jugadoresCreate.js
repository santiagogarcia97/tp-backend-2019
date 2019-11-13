const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try{

    let jugadorNew = {
      nombre: req.body.nombre,
      fechaNac: req.body.fechaNac,
      equipo: req.body.equipo,
      goles: req.body.goles,
      amarillas: req.body.amarillas,
      rojas: req.body.rojas
    }

    let error = jugadorModel.joiValidate(jugadorNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    let jugador = new jugadorModel(jugadorNew);

    await jugador.save((err, result) => {
      if(!err){
        return sendRes(res, 200, 'Jugador agregado con exito!', result);
      }
      else{
        return next(boom.badImplementation('Error al intentar guardar el jugador', err));
      }
    });

  } catch(err){
    return next(err);
  }
}
