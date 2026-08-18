import db from "../dbConnection/dbConnection.js";

const players = db.collection("players")

const create = async (player) => {
    const result = await players.insertOne(player)
    return result.insertedId.toString()
}

export default {create}

