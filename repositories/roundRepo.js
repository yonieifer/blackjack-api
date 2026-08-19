import db from "../dbConnection/dbConnection.js";
import { ObjectId } from "mongodb";

const rounds = db.collection("rounds");

const create = async (round) => {
    const result = await rounds.insertOne(round);
    return result.insertedId.toString();
};

const getOpenRoundByPlayerId = async (playerId) => {
    const round = await rounds.findOne({
        playerId: playerId,
        status: "in_progress",
    });
    if (!round) return;
    const { _id, ...rest } = round;
    return { id: _id.toString(), ...rest };
};

const addCardToPlayer = async (roundId, card) => {
    const result = await rounds.updateOne(
        { _id: new ObjectId(roundId) },
        { $push: { playerCards: card } },
    );
    return result.modifiedCount;
};

const updateStatus = async (roundId, newStatus) => {
    const result = await rounds.updateOne(
        { _id: new ObjectId(roundId) },
        { $set: { status: newStatus } },
    );
    return result.modifiedCount;
};

export default {
    create,
    getOpenRoundByPlayerId,
    updateStatus,
    addCardToPlayer,
    updateStatus,
};
