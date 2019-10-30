const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const eventoModel = mongoose.model('evento');

module.exports = async (req, res, next) => {
  try {

    await eventoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        let evento = {
          partido: req.body.partido || result.partido.str,
          tipo: req.body.tipo || result.tipo.str,
          equipo: req.body.equipo || result.equipo.str,
          jugador: req.body.jugador || result.jugador.str,
          fechaHora: req.body.fechaHora || result.fechaHora
        }

        let error = eventoModel.joiValidate(evento);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error));

        result.partido = req.body.partido || result.partido;
        result.tipo = req.body.tipo || result.tipo;
        result.equipo = req.body.equipo || result.equipo;
        result.jugador = req.body.jugador || result.jugador;
        result.fechaHora = req.body.fechaHora || result.fechaHora;

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Evento modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el Evento', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Evento no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el Evento', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
