import playerRepo from "../repositories/playerRepo.js";
import {createNewPlayer} from "../services/service.js"

const createNewPlayer = async () => {
    const player = createNewPlayer()
    const playerId = await playerRepo.create(player)
    return {playerId, chips: player.chips}
}

export default {createNewPlayer}