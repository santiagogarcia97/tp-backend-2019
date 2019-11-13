const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const eventoModel = mongoose.model('evento');

const populateOptions = [{
  path: 'equipo',
  select: 'nombre escudo'
},
  {
    path: 'jugador',
    select: 'nombre',
  },
  {
    path: 'tipo',
    select: 'desc icono',
  }
];

module.exports = async (req, res, next) => {
  try{

    await eventoModel.find({partido: req.params.id, eliminado: false}, 'equipo jugador tipo minutoOcurrencia')
      .sort({minutoOcurrencia: 1})
      .populate(populateOptions)
      .exec( (err, result) => {

        if(!err && result){
          if(result.length !== 0){
            return sendRes(res, 200, 'Eventos recuperados con exito!', result);
          }
          else if (result.length === 0) {
            return sendRes(res, 200, 'No existe ningun Evento');
          }
        }
        else{
          return next(boom.badImplementation('Error al intentar recuperar Eventos', err));
        }
      });

  } catch(err){
    return next(err);
  }
}
