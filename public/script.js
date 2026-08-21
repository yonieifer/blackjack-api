const message = document.querySelector(".message");
const welcomeView = document.querySelector(".welcome");
const welcomeBtn = document.querySelector(".start-game");

const bettingView = document.querySelector(".betting");
const betInput = document.querySelector("#bet-amount");
const playBtn = document.querySelector(".start-round");

const playingView = document.querySelector(".playing");

const table = document.querySelector(".table")
const dealerCardsList = document.querySelector(".cards-list.dealer");
const playerCardsList = document.querySelector(".cards-list.player");
const playerTotal = document.querySelector(".player.total");
const dealerTotal = document.querySelector(".dealer.total");

const hitBtn = document.querySelector(".hit");
const standBtn = document.querySelector(".stand");
const newRoundBtn = document.querySelector(".new-round")

const betV = document.querySelector(".bet-value");
const chipsV = document.querySelector(".chips-value");

const state = {
    playerId: localStorage.getItem("x-player-id") || null,
    view: "welcome",
    roundOver: false,
    msg: "",
    playerCards: [],
    dealerCards: [],
    dealerTotal: 0,
    playerTotal: 0,
    chips: 0,
    bet: 0,
};

const symbols = {
    "hearts": "♥️", "diamonds": "♦️", "clubs": "♣️", "spades": "♠️"
}

const showView = () => {
    welcomeView.classList.add("hide")
    bettingView.classList.add("hide")
    playingView.classList.add("hide")

    if (state.view === "welcome") welcomeView.classList.remove("hide")
    else if (state.view === "betting") bettingView.classList.remove("hide")
    else if (state.view === "playing") playingView.classList.remove("hide")
}

const showCards = (cards, container) => {
    container.innerHTML = "";
    cards.forEach((card) => {
        const listCard = document.createElement("li");
        listCard.classList.add("card");
        listCard.textContent = card.rank + symbols[card.suit];
        container.appendChild(listCard);
    });
};

const renderDom = () => {
    message.textContent = state.msg
    showCards(state.playerCards, playerCardsList)
    showCards(state.dealerCards, dealerCardsList)
    playerTotal.textContent = state.playerTotal
    dealerTotal.textContent = state.dealerTotal
    chipsV.textContent = state.chips
    betV.textContent = state.bet

    newRoundBtn.classList.toggle("hide", !state.roundOver)
    showView()
}

const startGame = async () => {
    const res = await fetch("/start-game", {
        method: "post",
    });
    if (!res.ok) {
        const errData = await res.json();
        state.msg = errData.message;
        renderDom()
        return;
    }
    const { playerId } = await res.json();
    localStorage.setItem("x-player-id", playerId);
    state.view = "betting"
    renderDom()
};

const startRound = async () => {
    const betAmount = betInput.value;
    state.msg = "";
    state.roundOver = false
    const res = await fetch("/start-round", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-player-id": localStorage.getItem("x-player-id"),
        },
        body: JSON.stringify({ bet: betAmount }),
    });
    if (!res.ok) {
        const errData = await res.json();
        state.msg = errData.message;
        renderDom()
        return;
    }
    const { roundId, playerCards, dealerUpCard, chips } = await res.json();
    state.playerCards = playerCards
    state.dealerCards = [dealerUpCard]
    state.chips = chips;
    state.bet = betAmount;
    state.view = "playing"
    renderDom()
};

const hit = async () => {
    state.msg = "";
    const res = await fetch("/hit", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-player-id": localStorage.getItem("x-player-id"),
        },
    });
    if (!res.ok) {
        const errData = await res.json();
        state.msg = errData.message;
        renderDom()
        return;
    }
    const { playerCards, playerTotal, status, chips } = await res.json();
    state.playerCards = playerCards
    state.playerTotal = playerTotal;
    state.chips = chips;
    if (status != "in_progress") {
        state.msg = status
        state.roundOver = true
    }
    renderDom()
};

const stand = async () => {
    state.msg = "";
    const res = await fetch("/stand", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-player-id": localStorage.getItem("x-player-id"),
        },
    });
    if (!res.ok) {
        const errData = await res.json();
        state.msg = errData.message;
        renderDom()
        return;
    }
    const {
        playerCards,
        dealerCards,
        playerTotal,
        dealerTotal,
        status,
        chips,
    } = await res.json();

    state.playerCards = playerCards
    state.dealerCards = dealerCards
    state.playerTotal = playerTotal;
    state.dealerTotal = dealerTotal;
    state.msg = status;
    state.chips = chips;
    state.roundOver = true
    renderDom()
};

const relaod = async () => {
    const res = await fetch("/my-round", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "x-player-id": localStorage.getItem("x-player-id"),
        },
    });
    if (!res.ok) {
        const errData = await res.json();
        state.msg = errData.message;
        renderDom()
        return;
    }
    const { playerId, bet, playerCards, dealerUpCards, status, chips, round } = await res.json();
    if (round === null) return;
    state.playerCards = playerCards
    state.dealerCards = [dealerUpCards]
    state.chips = chips;
    state.bet = bet;
    state.view = "playing"
    renderDom()
};

const newRound = () => {
    state.msg = "";
    state.view = "betting"
    renderDom()
}

welcomeBtn.addEventListener("click", startGame);

playBtn.addEventListener("click", startRound);

hitBtn.addEventListener("click", hit);

standBtn.addEventListener("click", stand);

document.addEventListener("DOMContentLoaded", relaod);

newRoundBtn.addEventListener("click", newRound)
