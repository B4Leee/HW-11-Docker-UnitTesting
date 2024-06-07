const { where } = require("sequelize");
const { Todo } = require("../models");

class TodoRepository {
  static async create(req, res, next) {
    const { title, description, status, user_id } = req;

    try {
      const todo = await Todo.create({
        title,
        description,
        status,
        user_id,
      });

      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const todo = await Todo.findAll();

      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async getById(req) {
    const { id } = req;
    try {
      const todo = Todo.findByPk(id);

      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async delete(req) {
    const { id } = req;
    try {
      const todo = await Todo.destroy({
        where: {
          id: id,
        },
      });

      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async restore(req) {
    const { id } = req;
    try {
      const todo = await Todo.restore({
        where: {
          id: id,
        },
        paranoid: false,
      });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDelete(req) {
    const { id } = req;
    try {
      const todo = await Todo.findAll({
        where: {
          id: id,
        },
        paranoid: false,
      });

      return todo;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TodoRepository;
