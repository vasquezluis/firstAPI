const { ObjectId } = require('mongodb')

const { Database } = require('../database/index');

const COLLECTION = 'products';

// obtener todos los datos de la base de datos
const getAll = async () => {
  const collection = await Database(COLLECTION);
  // devolver una consulta de mongo en forma de un array
  return await collection.find({}).toArray();
};

// obtener datos en base al id
const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

// crear nuevo producto
const create = async ( product ) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

module.exports.ProductsService= {
  getAll,
  getById,
  create,
}
