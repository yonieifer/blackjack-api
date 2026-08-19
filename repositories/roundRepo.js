import db from "../dbConnection/dbConnection.js";
import {ObjectId} from "mongodb"

const rounds = db.collection("rounds")

const create = async (round) => {
    const result = await rounds.insertOne(round)
    return result.insertedId.toString()
}

const getOpenRoundByPlayerId = async (playerId) => {
    const round = await rounds.findOne({playerId: playerId, status: "in_progress"})
    return round
}

const updateStatus = async (roundId, status) => {
    const result = await rounds.updateOne({_id: new ObjectId(roundId)}, {$set: {status: status}})
    return result.modifiedCount
}

export default {create, getOpenRoundByPlayerId, updateStatus}
