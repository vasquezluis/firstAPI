const express = require("express");

// obtener el controlador
const { UsersController } = require("./controller");

// permite manejar las rutas del modulo
const router = express.Router();

module.exports.UsersAPI = (app) => {
  router
    .get("/", UsersController.getUsers) // http://localhost:3000/api/users/
    .get("/:id", UsersController.getUser) // http://localhost:3000/api/users/23
    .post("/", UsersController.createUser)
    // update
    .put("/:id", UsersController.updateUser)
    // delete
    .delete("/:id", UsersController.deleteUser);
  // hacer disponibles todas las rutas
  app.use("/api/users", router);
};
