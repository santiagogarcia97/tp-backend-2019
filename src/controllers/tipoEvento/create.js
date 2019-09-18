const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const tipoEventoModel = mongoose.model('tipoEvento');

module.exports = async (req, res, next) => {
  try{

    let tipoEventoNew = {
      desc: req.body.desc,
      icono: req.body.icono
    }

    let error = tipoEventoModel.joiValidate(tipoEventoNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    let tipoEvento = new tipoEventoModel(tipoEventoNew);

    await tipoEvento.save((err, result) => {
      if(!err){
        sendRes(res, 200, 'Tipo de Evento agregado con exito!', result);
      }
      else{
        next(boom.badImplementation('Error al intentar guardar el Tipo de Evento', err));
      }
    });

    } catch(err){
      return next(err);
  }
}
