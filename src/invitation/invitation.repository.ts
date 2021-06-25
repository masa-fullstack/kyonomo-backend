import * as AWS from "aws-sdk";
import { InternalServerErrorException } from "@nestjs/common";

export class InvitationRepository {
  private tableName = process.env.INVITATION_TABLE_NAME;

  async create(
    invitation
  ): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    return await new AWS.DynamoDB.DocumentClient()
      .put(
        {
          TableName: this.tableName,
          Item: {
            id: invitation.id,
            mail: invitation.mail,
            lineId: invitation.lineId,
            limitDate: invitation.limitDate,
            limitTime: invitation.limitTime,
            text: invitation.text,
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

  async findOne(
    id: string
  ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
    return await new AWS.DynamoDB.DocumentClient()
      .get(
        {
          TableName: this.tableName,
          Key: {
            id: id,
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
}
