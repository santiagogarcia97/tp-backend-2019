const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try {

    await jugadorModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {
        let jugador = {
          nombre: req.body.nombre || result.nombre,
          fechaNac: req.body.fechaNac || result.fechaNac,
          equipo: req.body.equipo || (result.equipo === null)  ? undefined : result.equipo.str,
          goles: req.body.goles || result.goles
        }

        let error = jugadorModel.joiValidate(jugador);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error))

        result.nombre = req.body.nombre || result.nombre;
        result.fechaNac = req.body.fechaNac || result.fechaNac;
        result.equipo = req.body.equipo || result.equipo;
        result.goles = req.body.goles || result.goles;

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Jugador modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el jugador', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El jugador no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el jugador', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}

