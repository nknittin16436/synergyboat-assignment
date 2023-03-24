import { client } from "../db/connection"


export class EnergyUsageService {
    public async getTotalEnergyGroupedByStation() {
        try {
            await client.db('obe-sample').collection("energyusages").createIndex({ stationId: 1 })
            const cursor = await client.db('obe-sample').collection("energyusages").aggregate([
                {
                    $group: {
                        _id: "$stationId",
                        totalEnergy: { $sum: "$totalEnergy" }
                    }
                }
            ]);
            const results = await cursor.toArray();

            console.log(results)
            return results;
        } catch (error) {
            console.log(error)
        }

    }
    public async getTotalMinutesUsedGroupedByDate() {
        try {
            await client.db('obe-sample').collection("energyusages").createIndex({ stationId: 1 })
            const cursor = await client.db('obe-sample').collection("energyusages").aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$date" }
                        },
                        totalMinutes: { $sum: { $multiply: ["$total_hours_used", 60] } }
                    }
                }
            ])
            const results = await cursor.toArray();
            console.log(results)
            return results;
        } catch (error) {
            console.log(error)
        }

    }
}