const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const tipoEventoModel = mongoose.model('tipoEvento');

module.exports = async (req, res, next) => {
  try {

    await tipoEventoModel.findById(req.params.id, 'desc icono eliminado').
    exec((err, result) => {
      if (!err && result) {
        return sendRes(res, 200, 'Tipo de Evento recuperado con exito!', result);
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Tipo de Evento no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar recuperar Tipo de Evento', err));
      }
    });
  } catch(err) {
    return next(err)
  }
}
