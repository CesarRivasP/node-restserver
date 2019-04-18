const express = require('express');

const { verifyToken } = require('../middlewares/authentication');

const app = express();

const Product = require('../models/product');

// -- Obtener productos
app.get('/product', verifyToken, (request, response) => {
  // Traer todos los productos
  // populate debe cargar los usuarios y la categoria
  // paginado
})

// -- Obtener productos por id
app.get('/product/:id', verifyToken, (request, response) => {
  // Traer todos los productos
  // populate debe cargar los usuarios y la categoria
})

// -- Crear un nuevo producto
app.post('/product', verifyToken, (request, response) => {
  // grabar el usuario
  // grabar una categoria del listado
})

// -- Actualizar un producto
app.put('/product/:id', verifyToken, (request, response) => {
  // Traer todos los productos
  // populate debe cargar los usuarios y la categoria
  // paginado
})

// -- Borrar un producto
app.delete('/product/:id', verifyToken, (request, response) => {
  // Pasar disponible a falso
})
