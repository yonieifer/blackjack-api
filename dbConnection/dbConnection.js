import {MongoClient} from "mongodb"

const getMdbConnection = async () => {
    const client = new MongoClient(process.env.MDB_URI)
    try {
        await client.connect()
        const db = client.db("blackjack")
        return db
    } catch (error) {
        console.log(error);
    }
}

const db = await getMdbConnection()
export default db