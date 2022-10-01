const express = require("express");
// constante debug para trabajar con errores -> requiere el string a imprimir
const debug = require("debug")('app:main');

// obtener las variables de configuracion con destructuracion
const { Config } = require('./src/config/index');
// obtener datos del modulo productos
const { ProductsAPI } = require('./src/products/index')

app = express();  

// capacidad de recibir datos en el body
app.use(express.json());

// modulos
ProductsAPI(app);

app.listen(Config.port, () => {
  debug(`Server listen on port: ${Config.port}`);
});