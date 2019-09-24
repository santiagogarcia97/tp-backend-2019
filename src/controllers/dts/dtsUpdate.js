const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const dtModel = mongoose.model('dt');

module.exports = async (req, res, next) => {
  try {

    await dtModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        let dtNew = {
          nombre: req.body.nombre || result.nombre,
          fechaNac: req.body.fechaNac || result.fechaNac,
          equipo: req.body.equipo || (result.equipo === null)  ? undefined : result.equipo.str
        }

        let error = dtModel.joiValidate(dtNew);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error))

        result.nombre = req.body.nombre || result.nombre;
        result.fechaNac = req.body.fechaNac || result.fechaNac;
        result.equipo = req.body.equipo || result.equipo

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Director Tecnico modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el Director Tecnico', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Director Tecnico no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el Director Tecnico', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}

