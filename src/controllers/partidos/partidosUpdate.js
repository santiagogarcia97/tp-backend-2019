const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const partidoModel = mongoose.model('partido');

module.exports = async (req, res, next) => {
  try {

    await partidoModel.findById(req.params.id).
    exec((err, result) => {
      if (!err && result) {

        let partido = {
          fechaHora: req.body.fechaHora || result.fechaHora,
          local: req.body.local || result.local.str,
          visitante: req.body.visitante || result.visitante.str,
          eventos: req.body.eventos || result.eventos.str,
          estadio: req.body.estadio || result.estadio.str,
          finalizado: req.body.finalizado || result.finalizado
        }

        let error = partidoModel.joiValidate(partido);
        if(error.error)
          return next(boom.badRequest('Error al validar los datos ingresados', error.error));

        result.fechaHora = req.body.fechaHora || result.fechaHora;
        result.local = req.body.local || result.local;
        result.visitante = req.body.visitante || result.visitante;
        result.eventos = req.body.eventos || result.eventos;
        result.estadio = req.body.estadio || result.estadio;
        result.finalizado = req.body.finalizado || result.finalizado;

        result.save((err, result) => {
          if(!err && result){
            return sendRes(res, 200, 'Partido modificado con exito!', result);
          } else{
            return next(boom.badImplementation('Error al intentar actualizar el Partido', err));
          }
        });
      }
      else if(!err && !result) {
        return sendRes(res, 200, 'El Partido no existe');
      }
      else {
        return next(boom.badRequest('Error al intentar actualizar el Partido', err));
      }

    });
  } catch(err) {
    return next(err)
  }
}
