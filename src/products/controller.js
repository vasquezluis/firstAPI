const debug = require("debug")("app:module-products-controller");
const { ProductsService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      // respuesta de exito
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      // respuesta de error, el error puede ser desconocido
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      // validacion de existencia de datos en la BdD
      if (!product) {
        // mandar una respuesta de error (not found)
        Response.error(res, new createError.NotFound());
      } else {
        // respuesta de exito
        Response.success(res, 200, `Producto ${product._id}`, product);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      // validacion de datos vacios
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        let newBody = {
          _id: insertedId,
          ...body
        }
        Response.success(res, 201, "Producto agregado", newBody);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  // update
  updateProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let productId = await ProductsService.getById(id);

      if (!productId) {
        Response.error(res, new createError.NotFound());
      } else if (!body || Object.keys(body) === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        await ProductsService.update(id, body);
        Response.success(res, 201, `Producto ${id} actualizado`, body);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  // delete
  deleteProduct: async (req, res) => {
      try {
        const {params: {id}} = req;
        let productId = await ProductsService.getById(id);
        if (!productId) {
          Response.error(res, new createError.NotFound());
        } else {
          let result = await ProductsService.deleteProduct(id);
          Response.success(res, 202, "Producto eliminado", productId);
        }
      }
      catch {
        debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
      }
  },
  generateReport: async (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
};
