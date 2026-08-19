import playerRepo from "../repositories/playerRepo.js"
import { createError } from "../utils/utils.js"

export const logger = (req, res, next) => {
    console.log(req.method, req.url);
    next()
}

export const identifyPlayer = async (req, res, next) => {
    const playerId = req.headers["x-player-id"]
    console.log(req.headers);
    
    const player = await playerRepo.getPlayerById(playerId)
    if (!player) {
        const error = createError(404, `player ${playerId} not found`)
        throw error
    }
    req.player = player
    next()
}

export const errorHandler = (err, req, res, next) => {
    const message = err.message || "server internal error"
    const status = err.status || 500
    res.status(status).json({message})
}