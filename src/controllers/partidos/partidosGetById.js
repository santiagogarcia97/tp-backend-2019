const mongoose = require('mongoose');
const sendRes = require('../../utils/sendResponse');
const boom = require('@hapi/boom');
const partidoModel = mongoose.model('partido');

const populateOptions = [{
  path: 'local visitante',
  select: 'nombre escudo',
  populate: {
    path: 'dt',
    select: 'nombre fechaNac'
  },
},
  {
    path: 'estadio',
    select: 'nombre direccion',
  }
];

module.exports = async (req, res, next) => {
  try {

    await partidoModel.findById(req.params.id, 'fechaHora local visitante eventos estadio eliminado')
      .populate(populateOptions)
      .exec((err, result) => {
        if (!err && result) {
          return sendRes(res, 200, 'Partido recuperado con exito!', result);
        }
        else if(!err && !result) {
          return sendRes(res, 200, 'El Partido no existe');
        }
        else {
          return next(boom.badRequest('Error al intentar recuperar Partido', err));
        }
      });
  } catch(err) {
    return next(err)
  }
}
