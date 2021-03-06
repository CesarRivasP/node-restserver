//Como es la primera instruccion, cuando se empiece a ejecutar la app va a leer el archivo al inicio
// y lo va a ejecutar, y alli va a configurar todo lo que el contenga.
require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Require de las rutas o controladores  -- BEFORE
// app.use( require('./routes/user'));
// app.use( require('./routes/login'));


// habilitar carpeta public
// Implementar el middleware para hacer publico todo el directorio
// app.use(express.static( __dirname + '../public')); Esto da una direccion erronea si no se requiere el paquete PATH
// console.log( __dirname + '../public');
// Agregando la libreria path
app.use(express.static(path.resolve(__dirname, '../public')));
// console.log(path.resolve(__dirname, '../public'));

// Con el path.resolve se mandan segmentos del path. Este metodo lo realiza automaticamente

//importancion que cargue una serie de rutas -- AFTER
app.use( require('./routes/index'));  // CONFIGURACION GLOBAL DE RUTAS

//mongodb es el protocolo / localhost con el puerto donde corre la DB / la base de datos
// mongoose.connect('mongodb://localhost:27017/coffe', LOCAL
mongoose.connect(process.env.urlDB, // CLOUD with MongoDB Atlas
  { useNewUrlParser: true, useCreateIndex: true },
  (error, response) => {
    if(error) throw error;

    console.log('Base de datos ONLINE');
  });

app.listen(process.env.PORT, () => {
  console.log(`Èscuchando por el puerto: ${process.env.PORT}`);
});
