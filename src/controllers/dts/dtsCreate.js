const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const dtModel = mongoose.model('dt');

module.exports = async (req, res, next) => {
  try{

    let dtNew = {
      nombre: req.body.nombre,
      fechaNac: req.body.fechaNac,
      equipo: req.body.equipo
    }

    let error = dtModel.joiValidate(dtNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    dtNew = new dtModel(dtNew);

    await dtNew.save((err, result) => {
      if(!err){
        return sendRes(res, 200, 'Director Tecnico agregado con exito!', result);
      }
      else{
        return next(boom.badImplementation('Error al intentar guardar el Director Tecnico', err));
      }
    });

  } catch(err){
    return next(err);
  }
}
