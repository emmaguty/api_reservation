import express from "express"

import { getUsers, getUser, updateUser, deleteUser } from '../controllers/usersController.js'
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//Veryfy Middleware Token Cookie Settings
router.get("/checkout", verifyToken, (req, res) => {
    res.send("Hello user, you are logged")
})

router.get("/checkuser/:id", verifyUser, (req, res) => {
    res.send("Hello user, you are logged and you can delete you account")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
    res.send("Hello Admin, you are logged and you can delete all accounts")
})

// GET ALL
router.get("/", verifyAdmin, getUsers)

// GET
router.get("/:id", verifyUser, getUser)

// UPDATE
router.put("/:id", verifyUser, updateUser)

// DELETE
router.delete("/:id", verifyUser, deleteUser)

export default router