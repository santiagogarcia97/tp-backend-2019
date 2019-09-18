const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try{

    await jugadorModel.find().
    exec( (err, result) => {
      if(!err && result.length !== 0){
        return sendRes(res, 200, 'Jugadores recuperados con exito!', result);
      }
      else if (result.length === 0) {
        return sendRes(res, 200, 'No existe ningun jugador');
      }
      else {
        return next(boom.badImplementation('Error al intentar recuperar jugadores', err));
      }
    });

  } catch(err){
    return next(err);
  }
}

