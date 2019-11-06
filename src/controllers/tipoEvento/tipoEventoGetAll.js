const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const tipoEventoModel = mongoose.model('tipoEvento');

module.exports = async (req, res, next) => {
  try{

    await tipoEventoModel.find({eliminado: false}, 'desc icono').
      exec( (err, result) => {
        if(!err && result){
          if(result.length !== 0){
            return sendRes(res, 200, 'Tipos de Evento recuperados con exito!', result);
          }
          else if (result.length === 0) {
            return sendRes(res, 200, 'No existe ningun Tipo de Evento');
          }
        }
        else{
          return next(boom.badImplementation('Error al intentar recuperar Tipos de Evento', err));
        }
    });
  } catch(err){
    return next(err);
  }
}
