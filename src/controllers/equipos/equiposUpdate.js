const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const equiposModel = mongoose.model('equipo');

module.exports = async (req, res, next) => {
  try {

    await equiposModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        let equipo = {
          nombre: req.body.nombre || result.nombre,
          jugadores: req.body.jugadores || result.jugadores,
          dt: req.body.dt || result.dt,
          escudo: req.body.escudo || (result.escudo === null) ? undefined : result.escudo.str
        }

        let error = equiposModel.joiValidate(equipo);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error));

        result.nombre = req.body.nombre || result.nombre;
        result.jugadores = req.body.jugadores || result.jugadores;
        result.dt = req.body.dt || result.dt;
        result.escudo = req.body.escudo || result.escudo;

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Equipo modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el Equipo', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Equipo no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el Equipo', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
