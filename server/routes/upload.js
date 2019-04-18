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

  let archive = request.files.archive;  //archivo fisico

  //obtener la extension del archivo
  let archiveNameSplit = archive.name.split('.');
  // console.log(archiveNameSplit);
  let extension = archiveNameSplit[archiveNameSplit.length -1]; //Para que siempre busque la ultima posicion
  // console.log(extension);

  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']

  if(extensionesValidas.indexOf(extension) < 0){ //indexOf me permite buscar en el array
    //Si es menor indica que no encontro nada semejante
    return response.status(400).json({
      ok: false,
      error: {
        message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
        ext: 'Extension recibida: ' + extension
      }
    })
  }

  archive.mv(`uploads/${archive.name}`, (error) => {
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
