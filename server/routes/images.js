const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Ruta para desplegar inforomacion
app.get('/image/:type/:img', (request, response) => {
  let type = request.params.type;
  let img = request.params.img;

  let pathImg = `./uploads/${type}/${img}`;
  let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');

  // Si hay un type invalido o el tipo no existe, o se quiere hacer un servicio que retorne una img por defecto
  response.sendFile(noImagePath)
})

// sendfile lee el content type del archivo y eso es lo que regresa, sea una imagen, json o html

module.exports = app;
