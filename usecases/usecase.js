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
        throw error;
    }
    const isValidBet = service.validateBetForPlayer(bet, player);
    if (!isValidBet) {
        const error = createError(400, "invalid bet");
        throw error;
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
        chips: player.chips - bet,
    };
};

const hit = async (player) => {
    const openRound = await roundRepo.getOpenRoundByPlayerId(player.id);
    if (!openRound) {
        const error = createError(
            409,
            "you dont have open round please press start round",
        );
        throw error;
    }
    const newCard = service.getCard();
    await roundRepo.addCardToPlayer(openRound.id, newCard);
    const playerCards = [...openRound.playerCards, newCard];
    const playerTotal = service.calculateHand(playerCards);
    let status = openRound.status;
    if (playerTotal > 21) {
        status = "player_bust";
        await roundRepo.updateStatus(openRound.id, status);
    }
    return {
        playerCards,
        playerTotal,
        status: status,
        chips: player.chips,
    };
};

const stand = async (player) => {
    const openRound = await roundRepo.getOpenRoundByPlayerId(player.id);
    if (!openRound) {
        const error = createError(
            409,
            "you dont have open round please press start round",
        );
        throw error;
    }
    const { dealerCards, dealerTotal } = service.playDealerTurn(
        openRound.dealerCards,
    );
    const { playerCards } = openRound;
    const playerTotal = service.calculateHand(playerCards);
    const status = service.statusDecision(dealerTotal, playerTotal);
    await roundRepo.updateStatus(openRound.id, status);
    if (status === "dealer_bust" || status === "player_win")
        await playerRepo.updateChips(player.id, openRound.bet * 2);
    else if (status === "push")
        await playerRepo.updateChips(player.id, openRound.bet);
    return {
        playerCards,
        dealerCards,
        playerTotal,
        dealerTotal,
        status,
        chips: player.chips + openRound.bet * 2,
    };
};

const getRoundDetails = async (player) => {
    const round = await roundRepo.getOpenRoundByPlayerId(player.id);
    const { _id, dealerCards, ...rest } = round;
    return { dealerUpCards: dealerCards[0], ...rest };
};

export default { createNewPlayer, startRound, hit, stand, getRoundDetails };
