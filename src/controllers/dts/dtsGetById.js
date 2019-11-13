const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const dtModel = mongoose.model('dt');

const populateOptions = {
  path: 'equipo',
  select: 'nombre escudo'
};

module.exports = async (req, res, next) => {
  try{

    await dtModel.findById(req.params.id, 'nombre fechaNac equipo eliminado')
      .populate(populateOptions)
      .exec((err, result) => {
        if (!err && result) {
          return sendRes(res, 200, 'Director Tecnico recuperado con exito!', result);
        }
        else if(!err && !result) {
          return sendRes(res, 200, 'El Director Tecnico no existe');
        }
        else {
          return next(boom.badRequest('Error al intentar recuperar Director Tecnico', err));
        }
      });

  } catch(err){
    return next(err);
  }
}


