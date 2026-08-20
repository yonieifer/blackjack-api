const welcomeDiv = document.querySelector(".welcome");
const welcomeBtn = document.querySelector(".start-game");
const roundDiv = document.querySelector(".round-details");
const betInput = document.querySelector("#bet-amount");
const roundBtn = document.querySelector(".start-round");
const gameTable = document.querySelector(".game-table");
const dealerCardsList = document.querySelector(".cards-list.dealer");
const playerCardsList = document.querySelector(".cards-list.player");
const hitBtn = document.querySelector(".hit");
const standBtn = document.querySelector(".stand");
const betValue = document.querySelector(".bet-value");
const chipsValue = document.querySelector(".chips-value");
const statusTitle = document.querySelector(".status");
const playerTotalP = document.querySelector(".player-total");
const dealerTotalP = document.querySelector(".dealer-total");
const message = document.querySelector(".message");

const startGame = async () => {
    const res = await fetch("/start-game", {
        method: "post",
    });
    if (!res.ok) {
        const errData = await res.json();
        message.textContent = errData.message;
        return;
    }
    const { playerId } = await res.json();
    localStorage.setItem("x-player-id", playerId);
    welcomeDiv.classList.add("hide");
    roundDiv.classList.remove("hide");
};

const showPlayerCards = (playerCards) => {
    playerCardsList.innerHTML = "";
    playerCards.forEach((card) => {
        const listCard = document.createElement("li");
        listCard.textContent = card.rank;
        playerCardsList.appendChild(listCard);
    });
};

const showDealerCards = (dealerCards) => {
    dealerCardsList.innerHTML = "";
    dealerCards.forEach((card) => {
        const listCard = document.createElement("li");
        listCard.textContent = card.rank;
        dealerCardsList.appendChild(listCard);
    });
};

const startRound = async () => {
    const betAmount = betInput.value;
    message.textContent = "";
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
        message.textContent = errData.message;
        return;
    }
    const { roundId, playerCards, dealerUpCard, chips } = await res.json();
    showPlayerCards(playerCards);
    showDealerCards([dealerUpCard]);
    chipsValue.textContent = chips;
    betValue.textContent = betAmount;
    statusTitle.textContent = "";
    roundDiv.classList.add("hide");
    gameTable.classList.remove("hide");
};

const hit = async () => {
    message.textContent = "";
    const res = await fetch("/hit", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-player-id": localStorage.getItem("x-player-id"),
        },
    });
    if (!res.ok) {
        const errData = await res.json();
        message.textContent = errData.message;
        return;
    }
    const { playerCards, playerTotal, status, chips } = await res.json();
    showPlayerCards(playerCards);
    playerTotalP.textContent = playerTotal;
    chipsValue.textContent = chips;
    if (status != "in_progress") {
        statusTitle.textContent = status;
        roundDiv.classList.remove("hide");
    }
};

const stand = async () => {
    message.textContent = "";
    const res = await fetch("/stand", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-player-id": localStorage.getItem("x-player-id"),
        },
    });
    if (!res.ok) {
        const errData = await res.json();
        message.textContent = errData.message;
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
    showPlayerCards(playerCards);
    showDealerCards(dealerCards);
    playerTotalP.textContent = playerTotal;
    dealerTotalP.textContent = dealerTotal;
    statusTitle.textContent = status;
    chipsValue.textContent = chips;
    roundDiv.classList.remove("hide");
};

const relaod = async () => {
    const res = fetch("/my-round");
    if (!res.ok) {
        const errData = await res.json();
        message.textContent = errData.message;
        return;
    }
    const { playerId, bet, playerUpCards, dealerCards, status } = res.json()
    
};

welcomeBtn.addEventListener("click", startGame);

roundBtn.addEventListener("click", startRound);

hitBtn.addEventListener("click", hit);

standBtn.addEventListener("click", stand);
