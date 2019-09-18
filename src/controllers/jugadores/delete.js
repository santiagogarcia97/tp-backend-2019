const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try {

    await jugadorModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        result.remove((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Jugador eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el jugador', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El jugador que intenta eliminar no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar eliminar el jugador', err));
      }
    });

  } catch(err) {
    return next(err)
  }
}

