import express from "express"
import usecase from "../usecases/usecase.js"
import {startGame} from "../controllers/gameController.js"

const router = express.Router()

router.post("/start-game", startGame)

export default router