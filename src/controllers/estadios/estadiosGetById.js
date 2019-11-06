const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadioModel = mongoose.model('estadio');

module.exports = async (req, res, next) => {
  try {

    await estadioModel.findById(req.params.id, 'nombre direccion eliminado').
    exec((err, result) => {
      if (!err && result) {
        return sendRes(res, 200, 'Estadio recuperado con exito!', result);
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El estadio no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar recuperar estadio', err));
      }
    });
  } catch(err) {
    return next(err)
  }
}
