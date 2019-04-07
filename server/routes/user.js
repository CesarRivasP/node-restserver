const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

// Utilizacion del modelo para grabar en la base de datos
const User = require('../models/user');
// Con la u mayuscula porque se crearan objetos con la palabra reservada 'new'

const app = express()

app.get('/user', (request, response) => {
  //parametros opcionales || pagina 0 (primeros registros)
  let since = Number(request.query.since) || 0; //asi indicamos por URL desde que registro se quiere obtener
  // Para manejar el limite
  let limit = Number(request.query.limit) || 5;

  // Referencia al usuario (esquema).
  // metodo find para que regrese todos los registros. Tambien se puede especificar una condicion dentro del mismo
  // User.find({}) // {} -> indica que debe traer todos los registros de la tabla
  User.find({})
    // .skip(5)  // con skit se salta una determinada cantidad de registros para poder mostrar los siguientes
    .skip(since)  // con skit se salta una determinada cantidad de registros para poder mostrar los siguientes
    // .limit(5)
    .limit(limit)
    .exec( (error, users) => { // funcion de mongoose para ejecutar el find
      if(error) {
        return response.status(400).json({
          ok: false,
          error: error
        })
      }

      response.json({
        ok: true,
        users
      })
    })
});

/*app.post('/user', (request, response) => {
  // response.json('postUser');

// El body es lo que va a aparecer cuando el body Parser procese cualquier payload que reciba en las peticiones
// funciona para las peticiones post, put, delete
  let body = request.body;

  if(body.name === undefined){
    // response.status(400).json();  status 400 y mandar un json vacio
    response.status(400).json({
      ok: false,
      menssage: 'The name is required'
    });
  }
  else {
    response.json({
      user: body
    });
  }
});*/

app.post('/user', (request, response) => {

  let body = request.body;
  // Asi se crea una nueva instancia del esquema usuario, con todas las propiedades y metodos
  // que trae mongoose.Tambien se le puede definir un objeto y pasarle los parametros deseados
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    // img: body.img
    role: body.role
  }); // Asi se crea un nuevo objeto de tipo usuario con todos estos valores

  //Para grabarlo en la base de datos
  user.save((error, userDB) => {  //save es una palabra reservada de mongoose
    // Vienen dos respuestas, un error en caso de que suceda o un usuario de base de datos
    // ese usuario es la respuesta del usuario que se grabo en mongo
    if(error) {
      return response.status(400).json({
        ok: false,
        error: error
      })
    }
    //Para que no retorne el valor de la contraseña
    // userDB.password = null;

    response.json({
      ok: true,
      user: userDB
    });
  })
});

app.put('/user/:id', (request, response) => {
  let id = request.params.id; //para obtener el id que llega desde la url

  // let body = request.body; before
  // Es valida esta opcion
  // User.findById(id, (error, userDB) => { Son opciones de mongoose
  //   userDB.save()
  // })

  // Para evitar que estos campos puedan ser actualizados
  // delete body.password;
  // delete body.google;

  // After
  let body = _.pick(request.body,  ['name', 'email', 'img', 'role', 'state']);

  //id, objecto a actualizar
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true },(error, userDB) => {
  //new es para que retorne el objeto actulizado en la peticion
  //runValidators es para que aplique las validaciones impuestas en el esquema cuando se actualice el objeto
    if(error) {
      return response.status(400).json({
        ok: false,
        error: error
      })
    }

    response.json({
      ok: true,
      user: userDB
    })
  })
});

app.delete('/user', (request, response) => {
  response.json('deleteUser');
});

module.exports = app;
// De esta manera se esta exportando el mismo archivo de app
// que va a pasar por referencia muchas cosas, como las configuraciones
// de las rutas
