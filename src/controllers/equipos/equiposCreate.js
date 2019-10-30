const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const equipoModel = mongoose.model('equipo');

module.exports = async (req, res, next) => {
  try{

    let equipoNew = {
      nombre: req.body.nombre,
      jugadores: req.body.jugadores,
      dt: req.body.dt,
      escudo: req.body.escudo
    }

    let error = equipoModel.joiValidate(equipoNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    equipoNew = new equipoModel(equipoNew);

    await equipoNew.save((err, result) => {
      if(!err){
        sendRes(res, 200, 'Equipo agregado con exito!', result);
      }
      else{
        next(boom.badImplementation('Error al intentar guardar el Equipo', err));
      }
    });

    } catch(err){
      return next(err);
  }
}
