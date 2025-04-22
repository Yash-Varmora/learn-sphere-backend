import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

import { corsOptions, limiter } from "./constants/config.js"

const app = express()

app.use(cors(corsOptions))

app.use(limiter)

app.use(helmet())

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))



app.get("/", (req, res) => {
    res.send("Welcome to the LearnSphere Backend")
})

export default app