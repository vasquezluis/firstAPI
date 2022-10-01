// traer todas las variables de .env a donde necesitemos
require('dotenv').config();

// exportar la propiedad Config con los valores del objeto
module.exports.Config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mongoDbname: process.env.MONGO_DBNAME, 
};