const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const eventoModel = mongoose.model('evento');

module.exports = async (req, res, next) => {
  try {

    await eventoModel.findById(req.params.id, 'partido equipo jugador tipo fechaHora').
    exec((err, result) => {
      if (!err && result) {
        return sendRes(res, 200, 'Evento recuperado con exito!', result);
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Evento no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar recuperar Evento', err));
      }
    });
  } catch(err) {
    return next(err)
  }
}
