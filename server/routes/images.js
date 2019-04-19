const express = require('express');
const path = require('path');
const fs = require('fs');
const { verifyTokenImg }= require('../middlewares/authentication');

const app = express();

// Ruta para desplegar inforomacion
app.get('/images/:type/:img', verifyTokenImg, (request, response) => {
  let type = request.params.type;
  let img = request.params.img;

  // console.log(type);
  console.log(img);
  // let pathImg = `./uploads/${type}/${img}`;

  let pathImage = path.resolve(__dirname, `../../uploads/${type}/${img}`);
  console.log(pathImage);

  if(fs.existsSync(pathImage)){
    response.sendFile(pathImage)
  }
  else{
    // Si hay un type invalido o el tipo no existe, o se quiere hacer un servicio que retorne una img por defecto
    let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
    response.sendFile(noImagePath)
  }

})

// sendfile lee el content type del archivo y eso es lo que regresa, sea una imagen, json o html

module.exports = app;
