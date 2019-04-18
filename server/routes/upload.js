const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();


const User = require('../models/user');
const Category = require('../models/category');


app.use( fileUpload({ useTempFiles: true }) );
// al usar la funcion fileUpload, hace que todos los archivos que se carguen caigan dentro de 'request.files'

// app.put('/upload', (request, response) => {
app.put('/upload/:type/:id', (request, response) => {
  // After
  let type = request.params.type;
  let id = request.params.id;


  //Si no hay archivos
  if(!request.files){
    return response.status(400).json({
      ok: false,
      error: {
        message: 'No se ha seleccionado ningun archivo'
      }
    })
  }

  // Validar tipo
  let validatedTypes = ['users', 'products'];

  if(validatedTypes.indexOf(type) < 0){
    return response.status(400).json({
      ok: false,
      error: {
        message: 'Los tipos permitidos son ' + validatedTypes.join(', '),
        types: 'Tipo recibido: ' + type
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

  // Cambiar nombre al archivo, este debe ser unico
  // Tambien debe variar su nombre para prevenir el cache del navegador
  let archiveName = `${id}-${ new Date().getMilliseconds() }.${extension}`

  // archive.mv(`uploads//${type}/${archive.name}`, (error) => {  //Para accder al nombre del archivo
  archive.mv(`uploads/${type}/${archiveName}`, (error) => {
    if(error) {
      return response.status(500).json({
        ok: false,
        error
      })
    }

    // Aqui la imagen se cargo, esta en el filesystem

    response.json({
      ok: true,
      message: 'La imagen fue cargada correctamente'
    })
  })
})

module.exports = app;
