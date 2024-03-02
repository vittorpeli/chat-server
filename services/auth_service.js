const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const createError = require('http-errors');

class authService {
  static async register(data) {
    data.password = bcrypt.hashSync(data.password, 8);
    let user;
    try {
        user = await prisma.user.create({
            data
        });
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; 
    }
    data.accessToken = await jwt.signAccessToken(user);

    return data;
  }
  
  static async login(data) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      throw createError.NotFound('User not registered');
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');
    delete user.password;
    const accessToken = await jwt.signAccessToken(user);
    return {...user, accessToken };
  }

  static async all() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  static async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return user;
  }
}

module.exports = authService;