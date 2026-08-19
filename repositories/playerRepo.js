import db from "../dbConnection/dbConnection.js";
import {ObjectId} from "mongodb"

const players = db.collection("players")

const create = async (player) => {
    const result = await players.insertOne(player)
    return result.insertedId.toString()
}

const updateChips = async (playerId, amount) => {
    const result = await players.updateOne({_id: new ObjectId(playerId)}, {$inc: {chips: amount}})
    return result.modifiedCount
}

const getPlayerById = async (playerId) => {
    const player = await players.findOne({_id: new ObjectId(playerId)})
    const {_id, ...rest} = player
    return {id: _id.toString(), ...rest}
}

export default {create, updateChips, getPlayerById}

