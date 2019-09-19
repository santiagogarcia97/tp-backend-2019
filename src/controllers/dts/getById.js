const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const dtModel = mongoose.model('dt');

module.exports = async (req, res, next) => {
  try{

    await dtModel.findById(req.params.id).
    exec( (err, result) => {

      if(err){
        return next(boom.badRequest('Error al intentar recuperar Director Tecnico', err));
      }
      else if(!err && !result){
        return sendRes(res, 200, 'No existe ningun Director Tecnico');
      }
      else if(!err && result.length !== 0){
        return sendRes(res, 200, 'Director Tecnico recuperado con exito!', result);
      }
      else if (result.length === 0) {
        return sendRes(res, 200, 'El Director Tecnico no existe');
      }
    });

  } catch(err){
    return next(err);
  }
}


