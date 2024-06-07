const TodoService = require("../service/todoService");

class TodoController {
  static async create(req, res, next) {
    const { title, description, status, user_id } = req.body;

    try {
      const todo = await TodoService.create({
        title,
        description,
        status,
        user_id,
      });

      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    const todo = await TodoService.getAllTodo();

    res.status(200).json(todo);
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await TodoService.getTodoById({ id });

      if (!todo) {
        throw { id: "ErrorNotFound" };
      }

      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }

  // Soft Delete, Restoring, Find Data softDelete

  static async softDelete(req, res, next) {
    const { id } = req.params;

    try {
      const todo = await TodoService.delete({ id });
      if (!todo) {
        throw { id: "ErrorNotFound" };
      }
      res.status(200).json({ message: "Success Soft Delete data" });
    } catch (error) {
      next(error);
    }
  }

  static async restore(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await TodoService.restore({ id });
      if (!todo) {
        throw { id: "ErrorNotFound" };
      }
      res.json({ message: "Success restoring data" });
    } catch (error) {
      next(error);
    }
  }

  static async findAllDelete(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await TodoService.findAllDelete({ id });

      if (todo) {
        res.json(todo);
      } else {
        throw { id: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
