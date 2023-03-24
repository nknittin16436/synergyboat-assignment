import { client } from "../db/connection"


export class EnergyUsageService {
    public async getTotalEnergyGroupedByStation() {
        try {
            const cursor = await client.db('obe-sample').collection("energyusages").aggregate([
                {
                    $group: {
                        _id: "$stationId",
                        total_energy: { $sum: "$totalEnergy" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        stationId: "$_id",
                        total_energy: 1
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
                    },
                }, {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        totalMinutes: 1

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

    public async getMostBusyHoursByHourlyPort() {
        try {
            const cursor = await client.db('obe-sample').collection("energyusages").aggregate([
                {
                    $unwind: "$hourly_port"
                },
                {
                    $group: {
                        _id: "$hourly_port.time",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 5
                },
                {
                    $project: {
                        _id: 0,
                        mostBusyHour: "$_id",
                        count: 1

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