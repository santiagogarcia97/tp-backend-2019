const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estadioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String
  }
});

estadioSchema.statics.joiValidate = (obj) => {
  let Joi = require('@hapi/joi');
  let schema = {
    nombre:  Joi.string().alphanum().min(3).max(30).required(),
    direccion: Joi.string().alphanum().min(3).max(30)
  }

  return Joi.validate(obj, schema);
}

module.exports = mongoose.model('estadio', estadioSchema, 'estadios');

