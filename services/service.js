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
    cards.forEach((c) => {sum += RANKS[c.rank]});
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces -= 1;
    }
    return sum;
};

const getCard = () => {
    const card = {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)],
    };
    return card;
};

const createNewPlayer = () => {
    const player = {
        chips: 1000,
        createdAt: new Date().toLocaleString()
    }
    return player
}

export default {calculateHand, getCard, createNewPlayer}




