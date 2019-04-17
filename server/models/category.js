const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} No es un rol valido' //Mensaje de error
}

let Schema = mongoose.Schema;

let categorySchema = new Schema({
  description: {
    type: String,
    required: [true, 'Es necesaria una descripcion de la categoria']
  },
  user: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: true,
    default: true
  }
})

categorySchema.plugin(uniqueValidator, {message: '{PATH} Debe ser unico'});

module.exports = mongoose.model('Category', categorySchema)
