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
          $sort: {
            count: -1
          }
        },
        {
          $project: {
            _id: 0,
            action: "$_id",
            users: 1

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