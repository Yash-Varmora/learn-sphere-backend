import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

import { corsOptions, limiter } from "./constants/config.js"
import { CustomError, httpStatusCodes } from "./constants/constants.js"
import { errResponse } from "./helpers/response.js"
import indexRoute from "./routes/index.js"

const app = express()

app.use(cors(corsOptions))

app.use(limiter)

app.use(helmet())

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/api", indexRoute)

app.get("/", (req, res) => {
    res.send("Welcome to the LearnSphere Backend")
})

app.use((req, res, next) => {
    next(new CustomError(httpStatusCodes["Not Found"], "Not found"))
})

app.use(errResponse)

export default app