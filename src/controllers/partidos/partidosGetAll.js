const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const partidoModel = mongoose.model('partido');

const populateOptions = [{
    path: 'local visitante',
    select: 'nombre escudo',
    populate: {
      path: 'dt',
      select: 'nombre'
    },
  },
  {
    path: 'estadio',
    select: 'nombre direccion',
  }
];

module.exports = async (req, res, next) => {
  try{

    await partidoModel.find({eliminado: false}, 'fechaHora local visitante estadio finalizado')
      .populate(populateOptions)
      .exec( (err, result) => {

      if(!err && result){
        if(result.length !== 0){
          return sendRes(res, 200, 'Partidos recuperados con exito!', result);
        }
        else if (result.length === 0) {
          return sendRes(res, 200, 'No existe ningun Partido');
        }
      }
      else{
        return next(boom.badImplementation('Error al intentar recuperar Partidos', err));
      }
    });
  } catch(err){
    return next(err);
  }
}
