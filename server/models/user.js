// Este va a ser el encargado de trabajar el modelo de datos
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Roles validos
let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} No es un rol valido'  //mesaje de error, En value inyecta lo que el usuario envie
}

// El 'cascaron' para crear esquemas de mongoose
let Schema = mongoose.Schema;
// Definicion del esquema
let userSchema = new Schema({ //Declaracion de un nuevo esquema
// Reglas y controles que el usuario esquema debe tener, es decir, los campos que va a tener la collecion
  name: { //este va a ser un valor que se va a tener en la DB
    // Restricciones
    type: String,
    required: [true, 'El nombre es necesario']  //ESto va a disparar un mensaje generico, pero se puede especificar otro mensaje
  },
  email: {
    type: String,
    required: [true, 'El correo es necesario'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String, //Se va a almacenar en un string
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles  //tiene que existir dentro de esta enumeracion
  },
  state: {
    type: Boolean,
    required: true,
    default: true //para cuando se cree un nuevo usuario, lo cree activo
  },
  google: {
    type: Boolean,
    default: false //si el usuario no se crea con la propiedad de google, siempre va a ser un usuario
    // normal y dicha propiedad va a estar en false
  }
});

// El metodo toJSON en un esquema siempre se llama cuando se intenta imprimir
userSchema.methods.toJSON = function() {
  let usr = this;
  let usrObject = usr.toObject();
  delete usrObject.password;
  return usrObject;
} // Aqui se modifico cuando se imprima medianto un toJSON el esquema de usuario
// De manera que ya no se retorne el campo de la contraseña recien creada
// Se quito el password cada vez que el objeto quiera pasarse a un JSON

userSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser unico'});

// EL modelo se llama User (el nombre puede variar) y va a contener la configuracion de userSchema
module.exports = mongoose.model('User', userSchema);
