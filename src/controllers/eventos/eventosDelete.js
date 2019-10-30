const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const eventoModel = mongoose.model('evento');

module.exports = async (req, res, next) => {
  try {

    await eventoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        result.eliminado = true;

        result.save((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Evento eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Evento', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Evento que intenta eliminar no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar eliminar el Evento', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
