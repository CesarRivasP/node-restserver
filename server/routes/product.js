const express = require('express');

const { verifyToken } = require('../middlewares/authentication');

const app = express();

const Product = require('../models/products');

// -- Obtener productos
app.get('/products', verifyToken, (request, response) => {
  // Traer todos los productos
  // populate debe cargar los usuarios y la categoria
  // paginado
})

// -- Obtener productos por id
app.get('/products/:id', verifyToken, (request, response) => {
  // Traer todos los productos
  // populate debe cargar los usuarios y la categoria
})

// -- Crear un nuevo producto
app.post('/products', verifyToken, (request, response) => {
  // grabar el usuario
  // grabar una categoria del listado
})

// -- Actualizar un producto
app.put('/products/:id', verifyToken, (request, response) => {
  // Traer todos los productos
  // populate debe cargar los usuarios y la categoria
  // paginado
})

// -- Borrar un producto
app.delete('/products/:id', verifyToken, (request, response) => {
  // Pasar disponible a falso
})
