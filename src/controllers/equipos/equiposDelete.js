const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const equipoModel = mongoose.model('equipo');

module.exports = async (req, res, next) => {
  try {

    await equipoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        result.eliminado = true;

        result.save((err, result) => {
          if(!err && result) {
            return sendRes(res, 200, 'Equipo eliminado con exito!', result);
          }
          else {
            return next(boom.badImplementation('Error al intentar eliminar el Equipo', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Equipo que intenta eliminar no existe');
      }
      else {
        return next(boom.badImplementation('Error al intentar eliminar el Equipo', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
