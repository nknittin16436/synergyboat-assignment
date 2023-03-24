import { MongoClient } from 'mongodb'
import 'dotenv/config';

export const client = new MongoClient(process.env.MONGO_DB_URI as string);
export default async function connectToDb() {
    try {
        await client.connect();
    } catch (error) {
        console.log(error)
    }
}

