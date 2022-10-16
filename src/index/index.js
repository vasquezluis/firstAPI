// ruta por defecto para la direccion /

const express = require('express');
const createError = require('http-errors');

const { Response } = require('../common/response');

// controlar el menu de respuestas de la API
module.exports.IndexAPI = () => {

  const router = express.Router();

  router.get('/', (req, res) => {
    
    const menu = {
      products: `https://${req.headers.host}/api/products`,
      users: `https://${req.headers.host}/api/users`,
      sales: `https://${req.headers.host}/api/sales`
    }
    
    Response.success(res, 200, 'API Inventario', menu )
  })

  app.use('/', router);
}

// controlar las urls no encontradas
module.exports.NotFoundAPI = () => {  
  const router = express.Router();

  router.all('*', (req, res) => {
    Response.error(res, new createError.NotFound());
  })

  app.use('/', router)
}