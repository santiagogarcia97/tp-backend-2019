const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try {

    await jugadorModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        result.eliminado = true;

        result.save((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Jugador eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Jugador', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Jugador que intenta eliminar no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar eliminar el Jugador', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
