const UserRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

class UserService {
  static async register(req) {
    const { name, email, password } = req;
    const hashpassword = bcrypt.hashSync(password, 8);

    try {
      const user = await UserRepository.register({
        name,
        email,
        hashpassword,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async login(req) {
    const { email, password } = req;
    try {
      const user = await UserRepository.findByEmail(email);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const user = await UserRepository.getAll();

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(req, res, next) {
    const { id } = req;
    try {
      const user = await UserRepository.getById({ id });

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
