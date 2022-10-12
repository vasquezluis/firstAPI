const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");

const COLLECTION = "users";

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

// crear nuevo usuario
const create = async (user) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(user);
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
        email: body.email,
      },
    }
  );
  return result.insertedId;
};

// delete
const deleteUser = async (id) => {
  const collection = await Database(COLLECTION);
  let result = await collection.deleteOne({_id: ObjectId(id)})
  return result
};

module.exports.UsersService = {
  getAll,
  getById,
  create,
  update,
  deleteUser,
};
