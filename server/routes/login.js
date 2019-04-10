const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    let token = jwt.sign({
      //PAYLOAD -> informacion que queremos almacenar en el token
      user: userDB
    },
    // secret sirve para verificar que coincida el secret del token con el secret usado en el servidor
    // 'este-es-el-secret-o-seed-de-desarrollo',
    process.env.SEED_TOKEN,
    //para generarlo y de esa manera tiene que coincidir. De preferencia cualquier string separado por guiones
    // { expiresIn: 60 * 60 * 24 * 30 } //fecha de expiracion del token (segundos por minutos)
    // { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)} //fecha de expiracion del token (en una hora)
    { expiresIn: process.env.CADUCIDAD_TOKEN }
    // Asi expira en 30 dias
  )


    response.json({
      ok: true,
      user: userDB,
      // token: '123'
      token
    })
  })
})

module.exports = app;
