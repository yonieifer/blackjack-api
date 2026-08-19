import playerRepo from "../repositories/playerRepo.js";
import roundRepo from "../repositories/roundRepo.js";
import service from "../services/service.js";
import { createError } from "../utils/utils.js";

const createNewPlayer = async () => {
    const player = service.createNewPlayer();
    const playerId = await playerRepo.create(player);
    return { playerId, chips: player.chips };
};

const startRound = async (player, bet) => {
    const openRound = await roundRepo.getOpenRoundByPlayerId(player.id);
    if (openRound) {
        const error = createError(409, "you have open round already");
    }
    const isValidBet = service.validateBetForPlayer(bet, player);
    if (!isValidBet) {
        const error = createError(400, "invalid bet");
    }
    await playerRepo.updateChips(player.id, -bet);
    const playerCards = [service.getCard(), service.getCard()];
    const dealerCards = [service.getCard(), service.getCard()];
    const round = service.createNewRound(
        player.id,
        bet,
        playerCards,
        dealerCards,
    );
    const roundId = await roundRepo.create(round);
    return {
        roundId,
        playerCards,
        dealerUpCard: round.dealerCards[0],
        chips: player.chips,
    };
};

export default { createNewPlayer, startRound };
