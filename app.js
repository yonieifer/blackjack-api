import express from "express"
import router from "./routes/gameRouter.js"
import { errorHandler,logger } from "./middlewares/middlewares.js"


const server = express()

server.use(logger)

server.use(express.json())

server.use("/", router)

server.use(errorHandler)

server.listen(process.env.PORT, () => console.log(`server is up and listening on port ${process.env.PORT}`))
