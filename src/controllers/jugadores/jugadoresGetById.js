const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const jugadorModel = mongoose.model('jugador');

const populateOptions = {
  path: 'equipo',
  select: 'nombre escudo',
  populate: {
    path: 'dt',
    select: 'nombre'
  }
};

module.exports = async (req, res, next) => {
  try{

    await jugadorModel.findById(req.params.id, 'nombre fechaNac equipo goles amarillas rojas eliminado')
      .populate(populateOptions)
      .exec((err, result) => {
        if (!err && result) {
          return sendRes(res, 200, 'Jugador recuperado con exito!', result);
        }
        else if(!err && !result) {
          return sendRes(res, 200, 'El jugador no existe');
        }
        else {
          return next(boom.badRequest('Error al intentar recuperar jugador', err));
        }
      });

  } catch(err){
    return next(err);
  }
}


