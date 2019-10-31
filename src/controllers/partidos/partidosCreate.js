const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const partidoModel = mongoose.model('partido');

module.exports = async (req, res, next) => {
  try{

    let partidoNew = {
      fechaHora: req.body.fechaHora,
      local: req.body.local,
      visitante: req.body.visitante,
      eventos: req.body.eventos,
      estadio: req.body.estadio
    }

    let error = partidoModel.joiValidate(partidoNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    partidoNew = new partidoModel(partidoNew);

    await partidoNew.save((err, result) => {
      if(!err){
        sendRes(res, 200, 'Partido agregado con exito!', result);
      }
      else{
        next(boom.badImplementation('Error al intentar guardar el Partido', err));
      }
    });

    } catch(err){
      return next(err);
  }
}
