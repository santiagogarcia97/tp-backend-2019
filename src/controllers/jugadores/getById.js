const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try{

    await jugadorModel.findById(req.params.id).
    exec( (err, result) => {
      if(!err && result.length !== 0){
        return sendRes(res, 200, 'Jugador recuperado con exito!', result);
      }
      else if (result.length === 0) {
        return sendRes(res, 200, 'El jugador no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar recuperar jugador', err));
      }
    });

  } catch(err){
    return next(err);
  }
}


