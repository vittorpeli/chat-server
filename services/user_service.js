const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userService {
  static async findUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }, 
    })
    return user;
  }

  static async findUserByName(name){
    const user = await prisma.user.findUnique({
      where: { name },
    })
    return user;
  }
}

module.exports = userService;