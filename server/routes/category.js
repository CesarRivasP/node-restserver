const express = require('express');
const _ = require('underscore');
// Todas las peticiones a realizar van a requerir que el usuario este autenticado
const { verifyToken, verifyAdminRole }= require('../middlewares/authentication');

const Category = require('../models/category');

const app = express();


// -- Mostrar todas las categorias
app.get('/category', verifyToken, (request, response) => {

  Category.find({})
    .sort('description') //para ordernar los elementos
  // Va a revisar que id u objets id existen en la categoria que se esta solicitando y va a permitir
    .populate('user', 'name email') //cargar informacion
    .exec((error, category) => {
      if(error) {
        return response.status(400).json({
          ok: false,
          error
        })
      }

      response.json({
        ok: true,
        category
      })
    })
});

// -- Mostrar una categoria por id
app.get('/category/:id', verifyToken, (request, response) => {

  let id = request.params.id;

  Category.findById(id, (error, categoryDB) => {
    if(error) {
      return response.status(400).json({
        ok: false,
        error
      })
    }

    if(!categoryDB) {
      return response.status(500).json({
        ok: false,
        error: {
          message: 'El id no es valido'
        }
      })
    }

    response.json({
      ok: true,
      category: categoryDB
    })
  })
});

//  -- Crear una nueva categoria
app.post('/category', verifyToken, (request, response) => {
  // regresar la categoria
  let body = request.body;
  // let user = request.user._id
  let user = request.user

  let category = new Category({
    name: body.name,
    description: body.description,
    // user:  user.email
    user:  user._id
  });

  category.save((error, categoryDB) => {
    if(error) {
      return response.status(500).json({
        ok: false,
        error
      })
    }
    // si no se crea la categoriaDB
    if(!categoryDB) {
      return response.status(400).json({
        ok: false,
        error
      })
    }

    response.json({
      ok: true,
      category: categoryDB,
      id_category: categoryDB._id
    })
  })
});

// -- Actualizar la categoria
app.put('/category/:id', (request, response) => {
  // Basta con actualizar la descripcion de la categoria
  let id = request.params.id;

  let body = _.pick(request.body, ['description']);

  /*  Otra forma
  let body = request.body
  let descripcionCategoria = {
    description: body.description
  }

  */

  Category.findByIdAndUpdate(
    id, body,
    { new: true, runValidators: true },
    (error, categoryDB) => {
      if(error) {
        return response.status(400).json({
          ok: false,
          error
        })
      }

      response.json({
        ok: true,
        category: categoryDB
      })
  })
});

// -- Borrar la categoria
app.delete('/category/:id', [verifyToken, verifyAdminRole], (request, response) => {
  // Solo la puede borrar un administrador
  // Category.findByIdAndRemove
  let id = request.params.id;

  let user = request.user;

  Category.findByIdAndRemove(id, (error, categoryDeleted) => {
    if(error) {
      return response.status(400).json({
        ok: false,
        error
      })
    }
    if (!categoryDeleted){
      return response.status(400).json({
        ok: false,
        error: {
          message: 'Categoria no encontrada'
        }
      })
    }

    response.json({
      ok: true,
      category: categoryDeleted,
      message: 'Categoria Eliminada'
    })
  })
});

module.exports = app;
