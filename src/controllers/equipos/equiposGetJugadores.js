const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const escapeChars = require('../../utils/escapeChars');
const jugadorModel = mongoose.model('jugador');

module.exports = async (req, res, next) => {
  try{

    let findOptions = {
      eliminado: false,
      equipo: req.params.id
    }

    await jugadorModel.find(findOptions, 'nombre fechaNac goles amarillas rojas')
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
