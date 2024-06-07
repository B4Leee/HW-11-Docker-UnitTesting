const { where } = require("sequelize");
const { User } = require("../models");
const { errorMonitor } = require("supertest/lib/test");

class UserRepository {
  static async register(req) {
    try {
      const { name, email, hashpassword } = req;
      const user = await User.create({
        name,
        email,
        password: hashpassword,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(req) {
    try {
      const user = await User.findAll();

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getById(req) {
    try {
      const { id } = req;
      const user = await User.findByPk(id);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
