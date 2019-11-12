const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const escapeChars = require('../../utils/escapeChars');
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

    let findOptions = {
      nombre: { $regex: '.*.'},
      eliminado: false
    }
    if(req.query.search){
      findOptions.nombre = { $regex: '.*'+ escapeChars(req.query.search) + '.*', $options: 'i' }
    }

    await jugadorModel.find(findOptions, 'nombre fechaNac equipo goles amarillas rojas')
      .populate(populateOptions)
      .exec( (err, result) => {
        if(!err && result){
          if(result.length !== 0){
            return sendRes(res, 200, 'Jugadores recuperados con exito!', result);
          }
          else if (result.length === 0) {
            return sendRes(res, 200, 'No existe ningun jugador');
          }
        }
        else{
          return next(boom.badRequest('Error al intentar recuperar jugadores', err));
        }
      });

  } catch(err){
    return next(err);
  }
}

