import { AggregationCursor, Document } from "mongodb";
import { client } from "../db/connection"


export class UserAnalyticsService {

  public async getGroupedUserIdByAction() {
    try {
      const cursor: AggregationCursor<Document> = await client.db('obe-sample').collection("useranalytics").aggregate([
        {
          $group: {
            _id: {
              action: "$action",
              userId: "$userId"
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: "$_id.action",
            users: {
              $push: {
                userId: "$_id.userId",
                count: "$count"
              }
            }
          }
        },
        {
          $group: {
            _id: "groupedUser",
            LOGIN: {
              $push: {
                $cond: [{ $eq: ["$_id", "LOGIN"] }, "$users", "$$REMOVE"]
              }
            },
            DOWNLOAD: {
              $push: {
                $cond: [{ $eq: ["$_id", "DOWNLOAD"] }, "$users", "$$REMOVE"]
              }
            }
          }
        },
        {
          $project: {
            LOGIN: {
              $arrayElemAt: ["$LOGIN", 0]
            },
            DOWNLOAD: {
              $arrayElemAt: ["$DOWNLOAD", 0]
            }
          }
        },
        {
          $unwind: "$LOGIN"
        },
        {
          $sort: {
            "LOGIN.count": -1
          }
        },
        {
          $group: {
            _id: "$_id",
            LOGIN: {
              $push: "$LOGIN"
            },
            DOWNLOAD: {
              $first: "$DOWNLOAD"
            }
          }
        }
      ]);

      let results: Document[] = await cursor.toArray();
      results
      return results;
    } catch (error) {
      console.log(error)
    }

  }

  public async getMostActiveUser() {
    try {
      const cursor: AggregationCursor<Document> = await client.db('obe-sample').collection("useranalytics").aggregate([
        {
          $match: {
            action: { $exists: true }
          }
        },
        {
          $match: {
            action: { $in: ["LOGIN", "DOWNLOAD"] }
          }
        },
        {
          $group: {
            _id: {
              createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              userId: "$userId"
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $group: {
            _id: "$_id.createdAt",
            users: {
              $push: {
                userId: "$_id.userId",
                count: "$count"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            createdAt: "$_id",
            users: 1,
            mostActiveUser: { $first: "$users" }

          }
        }
      ])

      const results: Document[] = await cursor.toArray();

      console.log(results)
      return results;
    } catch (error) {
      console.log(error)
    }

  }
}