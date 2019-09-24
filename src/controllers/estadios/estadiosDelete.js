const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadioModel = mongoose.model('estadio');

module.exports = async (req, res, next) => {
  try {

    await estadioModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        result.remove((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Estadio eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el estadio', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El estadio que intenta eliminar no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar eliminar el estadio', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
