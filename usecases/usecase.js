import playerRepo from "../repositories/playerRepo.js";
import service from "../services/service.js"

const createNewPlayer = async () => {
    const player = service.createNewPlayer()
    const playerId = await playerRepo.create(player)
    return {playerId, chips: player.chips}
}

export default {createNewPlayer}