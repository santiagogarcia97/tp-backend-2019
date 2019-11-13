const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estadioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String
  },
  imagen: {
    type: String
  },
  eliminado: {
    type: Boolean,
    default: false
  }
});

estadioSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    nombre:  Joi.string().min(3).max(50).required(),
    direccion: Joi.string().min(3).max(100),
    imagen: Joi.string().min(3)
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('estadio', estadioSchema, 'estadios');

