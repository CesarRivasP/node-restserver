const express = require('express');
const _ = require('underscore');

const { verifyToken } = require('../middlewares/authentication');

const Product = require('../models/product');

const app = express();

// -- Obtener productos
app.get('/product', verifyToken, (request, response) => {

  // paginado
  let since = Number(request.query.since) || 0;
  let limit = Number(request.query.limit) || 5;

  Product.find({})
    .skip(since)
    .limit(limit)
    .sort('description')
    .populate('user', 'name email') // populate debe cargar los usuarios y la categoria
    .populate('category', 'description')
    .exec((error, products) => {
      if(error){
        return response.status(400).json({
          ok: false,
          error
        })
      }

      // Traer todos los productos
      response.json({
        ok: true,
        products
      })
    })
})

// -- Obtener productos por id
app.get('/product/:id', verifyToken, (request, response) => {
  // Traer todos los productos

  let id = request.params.id;
  Product.findById(id)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((error, productDB) => {

      if(error){
        return response.status(500).json({
          ok: false,
          error
        })
      }

      if(!productDB){
        return response.status(400).json({
          ok: false,
          error: {
            message: 'El id no es valido'
          }
        })
      }

      response.json({
        ok: true,
        product: productDB
      })
  })
})


// -- Buscar productos
app.get('/product/search/:term', verifyToken, (request, response) => {

  let term = request.params.term;
  //Esta es una funcion nativa de JS
  // La i indica que sea insensible ante mayusculas y minusculas
  let regex = new RegExp(term, 'i');

  Product.find({description: regex})
    .populate('category', 'description')
    .exec((error, products) => {
      if(error) {
        return response.status(500).json({
          ok: false,
          error
        })
      }

      if(!products){
        return response.status(400).json({
          ok: false,
          error
        })
      }

      response.json({
        ok: true,
        products
      })
    })
})

// -- Crear un nuevo producto
app.post('/product', verifyToken, (request, response) => {
  // grabar el usuario
  let body = request.body;
  // grabar una categoria del listado
  let category = request.category;

  let user = request.user;

  let product = new Product({
    name: body.name,
    unitPrice: body.unitPrice,
    description: body.description,
    category: body.category,
    user: user._id,
  })

  product.save((error, productDB) => {
    if(error) {
      return response.status(500).json({
        ok: false,
        error
      })
    }

    if(!productDB){
      return response.status(400).json({
        ok: false,
        error
      })
    }

    response.status(201).json({
      ok: true,
      product: productDB
    })
  })

})

// -- Actualizar un producto
app.put('/product/:id', verifyToken, (request, response) => {
  let id = request.params.id;

  let body = request.body;

  let updateProduct = {
    name: body.name,
    unitPrice: body.unitPrice,
    description: body.description,
    avaliable: body.avaliable
  }

  Product.findByIdAndUpdate(id, updateProduct, { new: true, runValidators: true }, (error, productDB) => {
    if(error) {
      return response.status(400).json({
        ok: false,
        error
      })
    }
    if(!productDB) {
      return response.status(400).json({
        ok: false,
        error: {
          message: 'El producto no existe'
        }
      })
    }

    // Otra forma de actualizar los registros. Habria que obviar updateProduct al inicio
  /*  productDB.name = body.name;
    productDB.unitPrice = body.unitPrice;
    productDB.description = body.description;
    productDB.avaliable = body.avaliable;
    productDB.save((err, productSave) => {
      response.json({
        ok: true,
        product: productSave
      })
    })*/

    response.json({
      ok: true,
      product: productDB
    })
  })
})

// -- Borrar un producto
app.delete('/product/:id', verifyToken, (request, response) => {
  // Pasar disponible a falso
  let id = request.params.id;
  let changeState = { avaliable: false };

  Product.findByIdAndUpdate(id, changeState, { new: true }, (error, productInactve) => {
    if(error) {
      return response.status(500).json({
        ok: false,
        error: error
      })
    }

    if(!productInactve) {
      return response.status(400).json({
        ok: false,
        error: {
          message: 'Producto no encontrado'
        }
      })
    }

    response.json({
      ok: true,
      product: productInactve
    })
  })

})

module.exports = app;
