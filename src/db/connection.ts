import { MongoClient } from 'mongodb'

export const client = new MongoClient('mongodb+srv://abhishek:P8tSb0FUTs4dFeCp@cluster0.ktzxbdz.mongodb.net/obe-sample');
export default async function connectToDb() {
    try {
        await client.connect();
    } catch (error) {
        console.log(error)
    }
}

export async function dataBaseList(client: any) {
    const databases: any = await client.db().admin().listDatabases();
    console.log(databases);
}

export async function collectionData(client: any) {
    const cursor: any = await client.db('obe-sample').collection("energyusages").find({});
    const results = await cursor.toArray();
    console.log("collection are ", results);
}

