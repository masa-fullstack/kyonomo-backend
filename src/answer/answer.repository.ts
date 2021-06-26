import * as AWS from "aws-sdk";
import { InternalServerErrorException } from "@nestjs/common";
import { Answer } from "./answer.types";

export class AnswerRepository {
  private tableName = process.env.ANSWER_TABLE_NAME;

  async create(answer): Promise<Answer> {
    const item: Answer = {
      id: answer.id,
      subId: answer.subId,
      status: answer.status,
      text: answer.text,
      referrer: answer.referrer,
    };

    const res = await new AWS.DynamoDB.DocumentClient()
      .put(
        {
          TableName: this.tableName,
          Item: item,
        },
        (err, data) => {
          if (err) {
            throw new InternalServerErrorException(err);
          }
          return data;
        }
      )
      .promise();

    return item;
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
