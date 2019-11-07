const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadioModel = mongoose.model('estadio');

module.exports = async (req, res, next) => {
  try{

    let estadioNew = {
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      imagen: req.body.imagen
    }

    let error = estadioModel.joiValidate(estadioNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    let estadio = new estadioModel(estadioNew);

    await estadio.save((err, result) => {
      if(!err){
        sendRes(res, 200, 'Estadio agregado con exito!', result);
      }
      else{
        next(boom.badImplementation('Error al intentar guardar el estadio', err));
      }
    });

    } catch(err){
      return next(err);
  }
}
