const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const dtModel = mongoose.model('dt');

module.exports = async (req, res, next) => {
  try {

    await dtModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        result.remove((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Director Tecnico eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Director Tecnico', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Director Tecnico que intenta eliminar no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar eliminar el Director Tecnico', err));
      }
    });

  } catch(err) {
    return next(err)
  }
}

