const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const estadioModel = mongoose.model('estadio');

module.exports = async (req, res, next) => {
  try{

    await estadioModel.find(null, 'nombre direccion').
      exec( (err, result) => {
      if(!err && result){
        if(result.length !== 0){
          return sendRes(res, 200, 'Estadios recuperados con exito!', result);
        }
        else if (result.length === 0) {
          return sendRes(res, 200, 'No existe ningun estadio');
        }
      }
      else{
        return next(boom.badImplementation('Error al intentar recuperar estadios', err));
      }
    });
  } catch(err){
    return next(err);
  }
}
