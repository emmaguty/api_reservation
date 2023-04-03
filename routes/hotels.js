import express from "express"

import { verifyAdmin } from "../utils/verifyToken.js"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotelController.js"


const router = express.Router()

// GET ALL
router.get("/", getHotels)

// GET
router.get("/find/:id", getHotel)
// CREATE
router.post("/", verifyAdmin, createHotel)

// UPDATE
router.put("/:id", verifyAdmin, updateHotel)

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router