const express = require('express');

// permite manejar las rutas del modulo
const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get('/', (req, res) => {}) // http://localhost:3000/api/products/
    .get('/:id', (req, res) => {}) // http://localhost:3000/api/products/23
    .post('/', (req, res) => {}) 

  // hacer disponibles todas las rutas
  app.use('/api/products', router);
}