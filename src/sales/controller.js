// reto: hacer que haya registro de ventas y listado de usuario por compras

const debug = require("debug")("app:module-sales-controller");
const { SalesService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.SalesController = {
  getSales: async (req, res) => {
    try {
      let sales = await SalesService.getAll();
      // respuesta de exito
      Response.success(res, 200, "Lista de ventas", sales);
    } catch (error) {
      debug(error);
      // respuesta de error, el error puede ser desconocido
      Response.error(res);
    }
  },
  getSale: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let sale = await SalesService.getById(id);
      // validacion de existencia de datos en la BdD
      if (!sale) {
        // mandar una respuesta de error (not found)
        Response.error(res, new createError.NotFound());
      } else {
        // respuesta de exito
        Response.success(res, 200, `Venta ${sale._id}`, sale);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  createSale: async (req, res) => {
    try {
      const { body } = req;
      console.log(body);
      const product = await SalesService.getProduct(body.product);
      const user = await SalesService.getUser(body.user);

      // validacion de datos vacios
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else if (!user || !product) {
        Response.error(res, new createError.NotFound());
      } else if (body.amount > product.cantidad) {
        Response.error(res, new createError.BadRequest());
      } else {
        let newBody = {
          ...body,
          total: body.amount * product.precio,
        };
        const insertedId = await SalesService.create(newBody);

        let bodyCreated = {
          _id: insertedId,
          ...newBody,
        };

        let idProduct = product._id.toString();
        let newProduct = {
          name: product.name,
          precio: product.precio,
          cantidad: product.cantidad - body.amount,
        };

        await SalesService.updateProduct(idProduct, newProduct);

        Response.success(res, 201, "Venta agregada", bodyCreated);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  // update
  updateSale: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      const { body } = req;

      let sale = await SalesService.getById(id);
      let product = await SalesService.getProduct(body.product);
      let user = await SalesService.getUser(body.user);

      if (!sale || !user || !product) {
        Response.error(res, new createError.NotFound());
      } else if (!body || Object.keys(body) === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        var newAmount;

        if (body.amount <= sale.amount) {
          newAmount = sale.amount - body.amount + product.cantidad;
          console.log(`new amount <= ${newAmount}`);
        }
        if (body.amount > sale.amount) {
          newAmount = body.amount - sale.amount;
          newAmount = product.cantidad - newAmount;
          console.log(`new amount > ${newAmount}`);
        }

        let idProduct = product._id.toString();
        let newProduct = {
          name: product.name,
          precio: product.precio,
          cantidad: newAmount,
        };

        delete sale["total"];
        let total = product.precio * body.amount;
        let newSale = {
          _id: id,
          ...body,
          total: total,
        };

        let oldProductAmount = sale.amount + product.cantidad;
        console.log(`old cantidadd ${oldProductAmount}`);

        await SalesService.updateProduct(idProduct, newProduct);

        if (body.amount <= oldProductAmount) {
          await SalesService.update(id, newSale);
          Response.success(res, 201, `Venta ${id} actualizada`, newSale);
        } else {
          Response.error(res, new createError.BadRequest());
        }
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  deleteSale: async (req, res) => {
    try {

      const {params: {id}} = req;

      let productId = await SalesService.getById(id);

      if (!productId) {
        Response.error(res, new createError.NotFound());
      } else {
        let result = await SalesService.deleteSale(id);
        Response.success(res, 202, "Venta eliminada", productId);
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
      SalesService.generateReport("ventas", res);
    } catch {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
};
