const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class roomService {
  static async all() {
    const allRooms = await prisma.room.findMany();
    return allRooms;
  }

  static async show(id) {
    const convertedId = parseInt(id);
    const room = await prisma.room.findUnique({
      where: { id: convertedId },
    })
    return room;
  }

  static async create(data) {
    const room = await prisma.room.create({
      data
    })
    return room;
  } 

  static async update(id, data) {
    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data,
    })
    return updatedRoom;
  }

  static async delete(id) {
    const deletedRoom = await prisma.room.delete({
      where: { id: parseInt(id) }
    })
    return deletedRoom;
  }

  static async connectUser(roomId, userId) {
    const room = await prisma.room.update({
      where: { id: parseInt(roomId) },
      data: {
        members: { connect: { id: parseInt(userId) } }
      }
    })
    return room;
  }
}

module.exports = roomService;