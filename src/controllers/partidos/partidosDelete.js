const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const partidoModel = mongoose.model('partido');

module.exports = async (req, res, next) => {
  try {

    await partidoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        result.eliminado = true;

        result.save((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Partido eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Partido', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Partido que intenta eliminar no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar eliminar el Partido', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
