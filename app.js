import express from "express"

const server = express()

server.use(express.json())

server.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

server.listen(process.env.PORT, () => console.log(`server is up and listening on port ${process.env.PORT}`))