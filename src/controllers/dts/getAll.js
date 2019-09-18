const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const dtModel = mongoose.model('dt');

module.exports = async (req, res, next) => {
  try{

    await dtModel.find().
    exec( (err, result) => {
      if(!err && result.length !== 0){
        return sendRes(res, 200, 'Directores Tecnicos recuperados con exito!', result);
      }
      else if (result.length === 0) {
        return sendRes(res, 200, 'No existe ningun Director Tecnico');
      }
      else {
        return next(boom.badImplementation('Error al intentar recuperar Directores Tecnicos', err));
      }
    });

  } catch(err){
    return next(err);
  }
}

