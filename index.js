const express = require("express");
// constante debug para trabajar con errores -> requiere el string a imprimir
const debug = require("debug")('app:main');
// cors para origen
const cors = require("cors");
// obtener las variables de configuracion con destructuracion
const { Config } = require('./src/config/index');

// obtener datos del modulo productos
const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require('./src/users/index')
const { SalesAPI } = require("./src/sales/index");
const { IndexAPI, NotFoundAPI } = require('./src/index/index')

app = express();  

// capacidad de recibir datos en el body
app.use(express.json());

// admitir origin CORS
app.use(cors())

// modulos
IndexAPI(app);
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () => {
  debug(`Server listen on port: ${Config.port}`);
});