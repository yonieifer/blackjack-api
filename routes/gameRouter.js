import express from "express";
import {
    getGame,
    startGame,
    startRound,
    hit,
    stand,
    getMyRound,
} from "../controllers/gameController.js";
import { identifyPlayer } from "../middlewares/middlewares.js";

const router = express.Router();

router.get("/", getGame)

router.post("/start-game", startGame);

router.post("/start-round", identifyPlayer, startRound);

router.post("/hit", identifyPlayer, hit);

router.post("/stand", identifyPlayer, stand);

router.get("/my-round", identifyPlayer, getMyRound);

export default router;
