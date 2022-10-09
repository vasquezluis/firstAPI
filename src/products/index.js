const express = require("express");

// obtener el controlador
const { ProductsController } = require("./controller");

// permite manejar las rutas del modulo
const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts) // http://localhost:3000/api/products/
    .get("/report", ProductsController.generateReport)
    .get("/:id", ProductsController.getProduct) // http://localhost:3000/api/products/23
    .post("/", ProductsController.createProduct)
    // update
    .put("/:id", ProductsController.updateProduct)
    // delete
    .delete("/:id", ProductsController.deleteProduct);
  // hacer disponibles todas las rutas
  app.use("/api/products", router);
};
