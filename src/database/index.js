const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");

const { Config } = require('../config/index');

// iniciar variable de connection
var connection = null;

// Database como clave
module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        // MongoClient recibe una URL de consulta
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug('Nueva conexion realizada con MongoDB Atlas');
      } 
        debug('Reutilizando conexion');
        const db = connection.db(Config.mongoDbname);
        resolve(db.collection(collection))
      
    } catch (error) {
      reject(error);
    }
  });
