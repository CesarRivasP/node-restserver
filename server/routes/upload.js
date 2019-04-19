const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

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
    // Update Image
    imageUser(id, response, archiveName);

    // response.json({  BEFORE
    //   ok: true,
    //   message: 'La imagen fue cargada correctamente'
    // })
  })
})

// Tiene que virificar si el usuario existe
const imageUser = (id, response, archiveName) => {
  User.findById(id, (error, userDB) => {
    if(error) {
      // Aunque suceda un error, la imagen puede que se suba, por lo que hay que borrarla
      deleteArchives(archiveName, 'users');

      return response.status(500).json({
        ok: false,
        error
      })
    }

    // Verificacion de si existe un usuario
    if(!userDB){
      // deleteArchives(archiveName, 'users'); Asi se evita que se llene el server de basura

      return response.status(400).json({
        ok: false,
        error: {
          message: 'El usuario no existe'
        }
      })
    }

    // Para borrar la imagen de un usuario guardada en el servidor
    deleteArchives(userDB.img, 'users');

    //Actualizacion de imagen de usuario
    userDB.img = archiveName;

    userDB.save((error, userSave) => {
      response.json({
        ok: true,
        user: userSave,
        img: archiveName
      })
    })


  })

}

const deleteArchives = (nameImage, type) => {
  // Para eso, primero se tiene que confirmar que el path de la imagen existe
  // Asi que hay que revisar si en el filesystem existe

  //cada argumento del resolve son segmentos del path que se quiere construir
  // let pathImage = path.resolve(__dirname,`../../uploads/users/${userDB.img}`);
  let pathImage = path.resolve(__dirname,`../../uploads/${type}/${nameImage}`);
  // Verificacion de si la ruta existe
  if(fs.existsSync(pathImage)){ //existsSync regresa un true si el path existe o false si no existe
    //si existe hay que borrar el path. filesystem tiene una opcion para borrar archivos
    fs.unlinkSync(pathImage); //Se le agrega el path que se quiere borrar
    // Solo se puede hacer unlinkSync de un path que existe
  }
}
// const imageProduct = () => {
//
// }

module.exports = app;
