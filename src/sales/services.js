const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");

const { SalesUtils } = require("./utils");

const COLLECTION = "sales";
const COLLECTION2 = "products";
const COLLECTION3 = "users";

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

// obtener producto
const getProduct = async (product) => {
  const collection = await Database(COLLECTION2);
  return await collection.findOne({ name: product });
};

const updateProduct = async (id, body) => {
  const collection = await Database(COLLECTION2);
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
  return result;
};

// obtener usuario
const getUser = async (user) => {
  const collection = await Database(COLLECTION3);
  return await collection.findOne({ name: user });
};

// crear nueva venta
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
        user: body.user,
        product: body.product,
        amount: body.amount,
        total: body.total,
      },
    }
  );
  return result.insertedId;
};

// delete
const deleteSale = async (id) => {
  const collection = await Database(COLLECTION);
  let result = await collection.deleteOne({_id: ObjectId(id)})
  return result
};

// generar reporte
const generateReport = async (name, res) => {
  let sales = await getAll();
  SalesUtils.excelGenerator(sales, name, res);
};

module.exports.SalesService = {
  getAll,
  getById,
  getProduct,
  updateProduct,
  getUser,
  create,
  update,
  deleteSale,
  generateReport,
};
