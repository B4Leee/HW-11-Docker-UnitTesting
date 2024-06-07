const { where } = require("sequelize");
const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

class UserController {
  static async register(req, res, next) {
    const { name, email, password } = req.body;

    try {
      const user = await UserService.register({
        name,
        email,
        password,
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await UserService.login({ email, password });
      if (!user) {
        return res.status(401).json({ message: "Invalid Credintial" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: token });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const user = await UserService.getAllUser();

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById({ id });

      if (!user) {
        throw { id: "ErrorNotFound" };
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const user = UserService.getUserById({ id });
      await user.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: "successfully delete",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
