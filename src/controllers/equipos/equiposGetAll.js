const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const equipoModel = mongoose.model('equipo');

const populateOptions = [{
  path: 'dt',
  select: 'nombre'
  },
  {
    path: 'jugador',
    select: 'nombre',
  }
];

module.exports = async (req, res, next) => {
  try{

    await equipoModel.find({eliminado: false}, 'nombre jugadores dt escudo')
      .populate(populateOptions)
      .exec( (err, result) => {

        if(!err && result){
          if(result.length !== 0){
            return sendRes(res, 200, 'Equipos recuperados con exito!', result);
          }
          else if (result.length === 0) {
            return sendRes(res, 200, 'No existe ningun Equipo');
          }
        }
        else{
          return next(boom.badImplementation('Error al intentar recuperar Equipos', err));
        }
      });
  } catch(err){
    return next(err);
  }
}
