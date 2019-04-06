// Este va a ser el encargado de trabajar el modelo de datos
const mongoose = require('mongoose');
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
    required: [true, 'El correo es necesario']
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
    default: 'USER_ROLE'
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

// EL modelo se llama User (el nombre puede variar) y va a contener la configuracion de userSchema
module.exports = mongoose.model('User', userSchema);
