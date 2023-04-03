import express from "express"
import { createRoom, getRooms, getRoom, updateRoom, deleteRoom, updateRoomAvailability } from "../controllers/roomController.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// GET ALL
router.get("/", getRooms)

// GET
router.get("/:id", getRoom)
// CREATE
router.post("/:hotelId", verifyAdmin, createRoom)

// UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)

export default router