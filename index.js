import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

import cookieParser from 'cookie-parser';

import { PORT } from './config.js'

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Se conecto a MongoDB')
    } catch (error) {
        throw (error)
    }
}

mongoose.connection.on("Disconnected", () => {
    console.log("MongoDB disconnected!")
})

mongoose.connection.on("Connected", () => {
    console.log("MongoDB connected!")
})

const app = express();

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(cors())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json(({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    }))
})

app.listen(PORT, () => {
    connect()
    console.log('Escuchando en Puerto ' + PORT)
})
