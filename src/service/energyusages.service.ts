import { AggregationCursor, Document } from "mongodb";
import { client } from "../db/connection"


export class EnergyUsageService {
    public async getTotalEnergyGroupedByStation() {
        try {
            const cursor: AggregationCursor<Document> = await client.db('obe-sample').collection("energyusages").aggregate([
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

            const totalEnergyGroupedByStationResults: Document[] = await cursor.toArray();
            return totalEnergyGroupedByStationResults;
        } catch (error) {
            console.log(error)
        }

    }
    public async getTotalMinutesUsedGroupedByDate() {
        try {
            await client.db('obe-sample').collection("energyusages").createIndex({ stationId: 1 })
            const cursor: AggregationCursor<Document> = await client.db('obe-sample').collection("energyusages").aggregate([
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
            const results: Document[] = await cursor.toArray();
            return results;
        } catch (error) {
            console.log(error)
        }

    }

    public async getMostBusyHoursByHourlyPort() {
        try {
            const cursor: AggregationCursor<Document> = await client.db('obe-sample').collection("energyusages").aggregate([
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
                { $limit: 1 },
                {
                    $project: {
                        _id: 0,
                        mostBusyHour: "$_id",
                        count: 1,

                    }
                }
            ])

            const results: Document[] = await cursor.toArray();
            return results;
        } catch (error) {
            console.log(error)
        }

    }
    public async mapHourlyPortToPortNumber() {
        try {
            const cursor: AggregationCursor<Document> = await client.db('obe-sample').collection("energyusages").aggregate([
                { $unwind: "$hourly_port" },
                {
                    $group: {
                        _id: {
                            portNumber: "$portNumber",
                            hourly_port: "$hourly_port.time"
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $group: {
                        _id: "$_id.portNumber",
                        hourly_port: {
                            $push: {
                                time: "$_id.hourly_port",
                                count: "$count"
                            }
                        }
                    }
                }
                , {

                    $project: {
                        _id: 0,
                        portNumber: "$_id",
                        hourly_port: 1,
                    }
                }
            ])

            const results: Document[] = await cursor.toArray();
            return results;
        } catch (error) {
            console.log(error)
        }
    }
}