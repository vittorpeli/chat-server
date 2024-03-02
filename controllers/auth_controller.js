const auth = require('../services/auth_service');
const createError = require('http-errors');

class authController {
  static register = async (req, res, next) => {
    try {
      const user = await auth.register(req.body);
      res.status(200).json({
        status: true,
        message: 'User registered successfully',
        data: user
      })
    } catch (e) {
      console.error("Error during registration:", e)
      next(createError(e.statusCode, e.message))
    }
  }

  static async login (req, res, next) {
    try {
      const data = await auth.login(req.body);
      res.status(200).json({
        status: true,
        message: 'Account login successful',
        data
      })
    } catch (e) {
      next(createError(e.statusCode, e.message))
    }
  }

  static async all(req, res, next) {
    try {
      const users = await auth.all();
      res.status(200).json({
        status: true,
        message: "All users",
        data: users
      })
    } catch (e) {
      next(createError(e.statusCode, e.message))
    }
  }

  static async one(req, res, next) {
    const { id } = req.params;
    try {
      const user = await auth.findById(id);
      res.json(204).json({
        status: true,
        message: "User found",
        data: user,
      })
    } catch (err) {
      console.error("Error getting user:", err)
      next(createError(err.statusCode, err.message))
    }
  }
}

module.exports = authController;