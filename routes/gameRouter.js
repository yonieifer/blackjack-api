import express from "express"
import usecase from "../usecases/usecase.js"
import {startGame, startRound} from "../controllers/gameController.js"
import { identifyPlayer } from "../middlewares/middlewares.js"

const router = express.Router()

router.post("/start-game", startGame)

router.post("/start-round",identifyPlayer, startRound)

export default router