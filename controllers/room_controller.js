const room = require('../services/room_service');
const user = require('../services/auth_service');
const createError = require("http-errors");

class RoomController {
  static async getAll (req, res, next) {
    try {
      const rooms = await room.all();
      res.status(200).json({
        status: true,
        message: "All rooms",
        data: rooms
      })
    } catch (err) {
      console.error("Error getting all rooms:", err)
      next(createError(err.statusCode, err.message))
    }
  }

  static async show (req, res, next) {
    const { id } = req.params;
    try {
      const foundRoom = await room.show(id);
      if (!foundRoom) {
        return res.status(404).json({
          message: "Room not found",
        })
      }
      res.status(200).json({
        status: true,
        message: "Room",
        data: foundRoom
      })
    } catch (err) {
      console.error("Error getting room:", err)
      next(createError(err.statusCode, err.message))
    }
  }

  static async create(req, res, next) {
    const { title, description } = req.body;
    try {
      if (!title || !description ) {
        next(createError(400, "Missing required fields"))
      }

      const newRoom = await room.create({
        title,
        description,
      })

      if (!newRoom) {
        next(createError(400, "Error creating room"))
      }

      res.status(200).json({
        status: true,
        message: "Room created",
        data: newRoom,
      })

    } catch (err) {
      console.error("Error creating room:", err)
      next(createError(err.statusCode, err.message))
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const roomExists = await room.show(id);

      if (!roomExists) {
        next(createError(404, "Room not found"))
      }

      const updatedRoom = await room.update(id, { title, description });

      res.status(200).json({
        status: true,
        message: "Room updated",
        data: updatedRoom,
      })

    } catch (err) {
      console.error("Error updating room:", err)
      next(createError(err.statusCode, err.message))
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    
    await room.delete(id);

    res.status(404).json({
      status: true,
      message: "Room deleted",
    })
  }
}

module.exports = RoomController;