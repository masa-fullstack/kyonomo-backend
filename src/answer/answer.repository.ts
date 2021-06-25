import * as AWS from "aws-sdk";
import { InternalServerErrorException } from "@nestjs/common";

export class AnswerRepository {
  private tableName = process.env.ANSWER_TABLE_NAME;

  async create(answer): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    return await new AWS.DynamoDB.DocumentClient()
      .put(
        {
          TableName: this.tableName,
          Item: {
            id: answer.id,
            subId: answer.subId,
            status: answer.status,
            text: answer.text,
            referrer: answer.referrer,
          },
        },
        (err, data) => {
          if (err) {
            throw new InternalServerErrorException(err);
          }
          return data;
        }
      )
      .promise();
  }

  async findAll(id: string): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
    return await new AWS.DynamoDB.DocumentClient()
      .query(
        {
          TableName: this.tableName,
          ExpressionAttributeNames: { "#id": "id" },
          ExpressionAttributeValues: { ":val": id },
          KeyConditionExpression: "#id = :val",
        },
        (err, data) => {
          if (err) {
            throw new InternalServerErrorException(err);
          }
          return data;
        }
      )
      .promise();
  }
}
