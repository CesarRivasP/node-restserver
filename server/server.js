//Como es la primera instruccion, cuando se empiece a ejecutar la app va a leer el archivo al inicio
// y lo va a ejecutar, y alli va a configurar todo lo que el contenga.
require('./config/config');

const express = require('express');
const app = express()

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/user', (request, response) => {
  // response.send('Hello world');
  response.json('getUser');
});

app.post('/user', (request, response) => {
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

});

app.put('/user/:id', (request, response) => {
  let id = request.params.id; //para obtener el id que llega desde la url

  // response.json('putUser');
  response.json({
    id
  });
});

app.delete('/user', (request, response) => {
  response.json('deleteUser');
});

app.listen(process.env.PORT, () => {
  console.log(`Èscuchando por el puerto: ${process.env.PORT}`);
});
