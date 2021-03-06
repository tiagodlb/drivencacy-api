import {MongoClient} from "mongodb"
import dotenv from "dotenv";

dotenv.config()
let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL)
try{
    await mongoClient.connect()
    db = mongoClient.db(process.env.BANCO)
    console.log(`MongoDB database connected.`)
} catch(error){
    console.log("Error connecting to database.")
    console.log(process.env.MONGO_URL)
    console.log(error)
}

export default db;