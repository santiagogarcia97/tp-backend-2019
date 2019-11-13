const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadioModel = mongoose.model('estadio');

module.exports = async (req, res, next) => {
  try {

    await estadioModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        result.eliminado = true;

        result.save((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Estadio eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Estadio', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Estadio que intenta eliminar no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar eliminar el Estadio', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
