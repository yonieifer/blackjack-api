import express from "express"
import router from "./routes/gameRouter.js"

const server = express()

server.use(express.json())

server.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

server.use("/", router)

server.listen(process.env.PORT, () => console.log(`server is up and listening on port ${process.env.PORT}`))
