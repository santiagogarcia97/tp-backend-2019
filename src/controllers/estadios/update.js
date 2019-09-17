const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadioModel = mongoose.model('estadio');

module.exports = async (req, res, next) => {
  try {

    await estadioModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        let estadio = {
          nombre: req.body.nombre || result.nombre,
          direccion: req.body.direccion || result.direccion
        }

        let error = estadioModel.joiValidate(estadio);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error))

        result.nombre = req.body.nombre || result.nombre;
        result.direccion = req.body.direccion || result.direccion;

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Estadio modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el estadio', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El estadio no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el estadio', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}

/*
if (err) {
  next(boom.badImplementation('Error al intentar actualizar el estadio', err));
}
else if (result) {
  result.nombre = req.body.nombre || result.nombre;
  result.direccion = req.body.direccion || result.direccion;
  result.save((err, result) => {
    if(err) {
      next(boom.badImplementation('Error al intentar actualizar el estadio', err));
    }
    else {
      sendRes(res, 200, 'Estadio modificado con exito!', result);
    }
  });
}
else {
  sendRes(res, 200, 'El estadio no existe');
}*/
