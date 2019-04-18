const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use( fileUpload({ useTempFiles: true }) );
// al usar la funcion fileUpload, hace que todos los archivos que se carguen caigan dentro de 'request.files'

app.put('/upload', (request, response) => {
  //Si no hay archivos
  if(!request.files){
    return response.status(400).json({
      ok: false,
      error: {
        message: 'No se ha seleccionado ningun archivo'
      }
    })
  }

  let archive = request.files.archive;

  archive.mv('uploads/filename.jpg', (error) => {
    if(error) {
      return response.status(500).json({
        ok: false,
        error
      })
    }

    response.json({
      ok: true,
      message: 'La imagen fue cargada correctamente'
    })
  })
})

module.exports = app;
