import service from "./service.js";
import assert from "node:assert";
import { createDecipheriv } from "node:crypto";
import { describe, it } from "node:test";

describe("calculate hand", () => {
    it("returns the correct answer", () => {
        const result = service.calculateHand([
            { rank: 5, suit: "hearts" },
            { rank: "Q", suit: "clubs" },
        ]);
        assert.strictEqual(result, 15);
    });
});

describe("get card", () => {
    const card = service.getCard();
    const SUITS = ["hearts", "diamonds", "clubs", "spades"];
    const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"];
    it("returns valid keys in card", () => {
        assert.ok("suit" in card);
        assert.ok("rank" in card);
    });
    it("returns valid rank and suit in card", () => {
        const isValidRank = RANKS.includes(card.rank);
        const isValidSuit = SUITS.includes(card.suit);
        assert.ok(isValidRank);
        assert.ok(isValidSuit);
    });
});

describe("create new player", () => {
    const player = service.createNewPlayer();
    it("returns valid keys in player", () => {
        assert.ok("chips" in player);
        assert.ok("createdAt" in player);
    });
    it("validate initial chips amount", () => {
        assert.strictEqual(player.chips, 1000);
    });
});

describe("create new round", () => {
    const round = service.createNewRound(
        "1",
        50,
        [
            { rank: 5, suit: "hearts" },
            { rank: "Q", suit: "clubs" },
        ],
        [
            { rank: 5, suit: "hearts" },
            { rank: "Q", suit: "clubs" },
        ],
    );
    it("returns all but date correct", () => {
        const { createdAt, ...rest } = round;
        assert.deepStrictEqual(rest, {
            playerId: "1",
            bet: 50,
            playerCards: [
                { rank: 5, suit: "hearts" },
                { rank: "Q", suit: "clubs" },
            ],
            dealerCards: [
                { rank: 5, suit: "hearts" },
                { rank: "Q", suit: "clubs" },
            ],
            status: "in_progress",
        });
    });
});

describe("validate Bet For Player", () => {
    it("valid bet", () => {
        assert.ok(service.validateBetForPlayer(50, { chips: 500 }));
    });
});

describe("status Decision", () => {
    it("push", () => {
        assert.strictEqual(service.statusDecision(15, 15), "push");
    });
});
