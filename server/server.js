//Como es la primera instruccion, cuando se empiece a ejecutar la app va a leer el archivo al inicio
// y lo va a ejecutar, y alli va a configurar todo lo que el contenga.
require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express()

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Require de las rutas o controladores
app.use( require('./routes/user'));

//mongodb es el protocolo / localhost con el puerto donde corre la DB / la base de datos
mongoose.connect('mongodb://localhost:27017/coffe', {useNewUrlParser: true}, (error, response) => {
  if(error) throw error;

  console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
  console.log(`Èscuchando por el puerto: ${process.env.PORT}`);
});
