import { Injectable } from "@nestjs/common";
import { AnswerRepository } from "./answer.repository";
import { v4 as uuidV4 } from "uuid";
import { format } from "date-fns";
import { InvitationService } from "src/invitation/invitation.service";

@Injectable()
export class AnswerService {
  constructor(private readonly invitationService: InvitationService) {}

  async createAnswer(body): Promise<string> {
    if (!body.id) {
      return JSON.stringify({ error: "id は必須項目です" });
    }
    const invitationJson = await this.invitationService.getInvitation(body.id);
    const invitation = JSON.parse(invitationJson);
    const nowDate = format(new Date(), "yyyyMMdd");
    const nowTime = format(new Date(), "HHmm");

    if (
      invitation.limitDate < nowDate ||
      (invitation.limitDate === nowDate && invitation.limitTime < nowTime)
    ) {
      return JSON.stringify({ error: "回答期限が過ぎています" });
    }

    const subId = uuidV4();
    const answer = { subId, ...body };

    const result = await new AnswerRepository().create(answer);
    return JSON.stringify(result);
  }

  async getAnswers(id: string): Promise<string> {
    if (!id) {
      return JSON.stringify({ error: "id は必須項目です" });
    }
    const result = await new AnswerRepository().findAll(id);
    return JSON.stringify(result.Items);
  }
}
