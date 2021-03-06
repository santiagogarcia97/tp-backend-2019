const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const eventoModel = mongoose.model('evento');

module.exports = async (req, res, next) => {
  try{

    let eventoNew = {
      partido: req.params.id,
      tipo: req.body.tipo,
      equipo: req.body.equipo,
      jugador: req.body.jugador,
      minutoOcurrencia: req.body.minutoOcurrencia
    }

    let error = eventoModel.joiValidate(eventoNew);
    if(error.error)
      return next(boom.badRequest('Error al validar los datos ingresados', error.error))

    eventoNew = new eventoModel(eventoNew);

    await eventoNew.save((err, result) => {
      if(!err){
        sendRes(res, 200, 'Evento agregado con exito!', result);
      }
      else{
        next(boom.badImplementation('Error al intentar guardar el Evento', err));
      }
    });

  } catch(err){
    return next(err);
  }
}
