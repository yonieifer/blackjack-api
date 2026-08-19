const RANKS = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    J: 10,
    Q: 10,
    K: 10,
    A: 11,
};
const SUITS = ["hearts", "diamonds", "clubs", "spades"];

const calculateHand = (cards) => {
    let sum = 0;
    let aces = 0;
    cards.forEach((c) => {
        sum += RANKS[c.rank];
        if (c.rank === "A") aces++;
    });
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
};

const getCard = () => {
    const rankList = Object.keys(RANKS);
    const card = {
        rank: rankList[Math.floor(Math.random() * rankList.length)],
        suit: SUITS[Math.floor(Math.random() * SUITS.length)],
    };
    return card;
};

const createNewPlayer = () => {
    const player = {
        chips: 1000,
        createdAt: new Date().toLocaleString(),
    };
    return player;
};

const createNewRound = (playerId, bet, playerCards, dealerCards) => {
    const round = {
        playerId: playerId,
        bet: bet,
        playerCards: playerCards,
        dealerCards: dealerCards,
        status: "in_progress",
        createdAt: new Date().toLocaleString(),
    };
    return round;
};

const validateBetForPlayer = (bet, player) => {
    return bet > 0 && bet <= player.chips;
};

// const validateStatus = (status) => {
//     const validStatus = [
//         "in_progress",
//         "player_bust",
//         "dealer_bust",
//         "player_win",
//         "dealer_win",
//         "push",
//     ];
//     return validStatus.includes(status);
// };

const playDealerTurn = (dealerCards) => {
    let dealerTotal = calculateHand(dealerCards);
    while (dealerTotal < 17) {
        const newCard = getCard();
        dealerCards.push(newCard);
        dealerTotal = calculateHand(dealerCards);
    }
    return { dealerCards, dealerTotal };
};

const statusDecision = (dealerTotal, playerTotal) => {
    let status = "in_progress";
    if (dealerTotal > 21) status = "dealer_bust";
    else if (dealerTotal < playerTotal) status = "player_win";
    else if (dealerTotal > playerTotal) status = "dealer_win";
    else status = "push";
    return status;
};

export default {
    calculateHand,
    getCard,
    createNewPlayer,
    createNewRound,
    validateBetForPlayer,
    validateBetForPlayer,
    playDealerTurn,
    statusDecision,
};
