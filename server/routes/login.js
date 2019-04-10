const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const app = express();

app.post('/login', (request, response) => {

  let body = request.body;

  User.findOne({ email: body.email }, (error, userDB) => { // para regresar solo uno ({una condicion}, callback)
    //si existe un email valido se va a obtener en userDB
    //si no existe userDB seria null o vacio. El error solo sucede si se dispara una excepcion en la DB
    if(error) {
      return response.status(500).json({
        ok: false,
        error
      })
    }

    if(!userDB) { //si no existe
      return response.status(400).json({
        ok: false,
        error: {
          message: '(Usuario) o contraseña incorrectos'
        }
      });
    }

    // evaluacion de la contraseña
    // sino son iguales
    if(!bcrypt.compareSync(body.password, userDB.password)){  //para identificar si la contraseña ingresada hace match con la de base de datos
      //lleva como parametro la contraseña ingresada contra la contraseña almacenada en la DB
      // retorna true si lo logra hacer match o false un false si no lo logra
      return response.status(500).json({
        ok: false,
        error: {
          message: 'Usuario o (contraseña) incorrectos' //esto no se debe hacer en produccion
          // indicar si fue la contraseña o el usuario lo que esta incorrecto
        }
      })
    }

    response.json({
      ok: true,
      user: userDB,
      token: '123'
    })
  })
})

module.exports = app;
