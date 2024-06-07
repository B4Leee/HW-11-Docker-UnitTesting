const TodoRepository = require("../repositories/todoRepository");

class UserService {
  static async create(req) {
    const { title, description, status, user_id } = req;

    try {
      const todo = await TodoRepository.create({
        title,
        description,
        status,
        user_id,
      });

      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTodo(req, res, next) {
    try {
      const todo = await TodoRepository.getAll();

      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async getTodoById(req) {
    const { id } = req;
    try {
      const todo = await TodoRepository.getById({ id });

      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async delete(req) {
    const { id } = req;
    try {
      const todo = await TodoRepository.delete({ id });

      return todo;
    } catch (error) {}
  }

  static async restore(req) {
    const { id } = req;
    try {
      const todo = await TodoRepository.restore({ id });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  static async findAllDelete(req) {
    const { id } = req;
    try {
      const todo = await TodoRepository.getAllDelete({ id });

      return todo;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
