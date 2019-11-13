const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const tipoEventoModel = mongoose.model('tipoEvento');

module.exports = async (req, res, next) => {
  try {

    await tipoEventoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        result.eliminado = true;

        result.save((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Tipo de Evento eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Tipo de Evento', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Tipo de Evento que intenta eliminar no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar eliminar el Tipo de Evento', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
