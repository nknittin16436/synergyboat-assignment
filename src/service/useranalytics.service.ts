import { client } from "../db/connection"


export class UserAnalyticsService {
    public async getTotalEnergyGroupedByStation() {
        try {
            const cursor = await client.db('obe-sample').collection("useranalytics").find()

            const results = await cursor.toArray();

            console.log(results)
            return results;
        } catch (error) {
            console.log(error)
        }

    }

}