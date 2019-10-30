const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const equipoModel = mongoose.model('equipo');

module.exports = async (req, res, next) => {
  try {

    await equipoModel.findById(req.params.id, 'nombre jugadores dt escudo eliminado').
    exec((err, result) => {
      if (!err && result) {
        return sendRes(res, 200, 'Equipo recuperado con exito!', result);
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Equipo no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar recuperar Equipo', err));
      }
    });
  } catch(err) {
    return next(err)
  }
}
