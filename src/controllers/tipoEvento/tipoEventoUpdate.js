const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const tipoEventoModel = mongoose.model('tipoEvento');

module.exports = async (req, res, next) => {
  try {

    await tipoEventoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        let tipoEvento = {
          desc: req.body.desc || result.desc,
          icono: req.body.icono || result.icono
        }

        let error = tipoEventoModel.joiValidate(tipoEvento);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error))

        result.desc = req.body.desc || result.desc;
        result.icono = req.body.icono || result.icono;

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Tipo de Evento modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el Tipo de Evento', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Tipo de Evento no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el Tipo de Evento', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
