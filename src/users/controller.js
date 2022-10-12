const debug = require("debug")("app:module-users-controller");
const { UsersService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      // respuesta de exito
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      // respuesta de error, el error puede ser desconocido
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      // validacion de existencia de datos en la BdD
      if (!user) {
        // mandar una respuesta de error (not found)
        Response.error(res, new createError.NotFound());
      } else {
        // respuesta de exito
        Response.success(res, 200, `User ${user._id}`, user);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      // validacion de datos vacios
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        let newBody = {
          _id: insertedId,
          ...body
        }
        Response.success(res, 201, "Usuario agregado", newBody);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  // update
  updateUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let userId = await UsersService.getById(id);

      if (!userId) {
        Response.error(res, new createError.NotFound());
      } else if (!body || Object.keys(body) === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        await UsersService.update(id, body);
        Response.success(res, 201, `Usuario ${id} actualizado`, body);
      }
    } catch (error) {
      debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
    }
  },
  // delete
  deleteUser: async (req, res) => {
      try {
        const {params: {id}} = req;
        let userId = await UsersService.getById(id);
        if (!userId) {
          Response.error(res, new createError.NotFound());
        } else {
          let result = await UsersService.deleteUser(id);
          Response.success(res, 202, "Usuario eliminado", userId);
        }
      }
      catch {
        debug(error),
        // respuesta de error, el error puede ser desconocido
        Response.error(res);
      }
  },
};
