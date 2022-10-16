const express = require("express");

// obtener el controlador
const { SalesController } = require("./controller");

// permite manejar las rutas del modulo
const router = express.Router();

module.exports.SalesAPI = (app) => {
  router
    .get("/", SalesController.getSales) // http://localhost:3000/api/products/
    .get("/report", SalesController.generateReport)
    .get("/:id", SalesController.getSale) // http://localhost:3000/api/products/23
    .post("/", SalesController.createSale)
    // update
    .put("/:id", SalesController.updateSale)
    .delete("/:id", SalesController.deleteSale)
  // hacer disponibles todas las rutas
  app.use("/api/sales", router);
};
