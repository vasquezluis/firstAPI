const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");

const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

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
const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result;
};

// update
const update = async (id, body) => {
  const collection = await Database(COLLECTION);
  let result = await collection.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name: body.name,
        precio: body.precio,
        cantidad: body.cantidad,
      },
    }
  );
  return result.insertedId;
};

// delete
const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);
  let result = await collection.deleteOne({_id: ObjectId(id)})
  return result
};

// generar reporte
const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  generateReport,
};
