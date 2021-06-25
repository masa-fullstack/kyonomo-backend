import { Injectable } from "@nestjs/common";
import { InvitationRepository } from "./invitation.repository";
import { v4 as uuidV4 } from "uuid";
import { format } from "date-fns";

@Injectable()
export class InvitationService {
  async createInvitation(body): Promise<string> {
    const id = uuidV4();
    let limitDate: string = "";
    let limitTime: string = "";
    if (!body.limitDate || !body.limitTime) {
      limitDate = format(new Date(), "yyyyMMdd");
      limitTime = format(new Date(), "HHmm");
    } else {
      // const inputDate = new Date(body.limitDate + body.limitTime);
      // limitDate = format(inputDate, "yyyyMMdd");
      // limitTime = format(inputDate, "HHmm");

      limitDate = body.limitDate;
      limitTime = body.limitTime;
    }

    const invitation = { id, limitDate, limitTime, ...body };
    const result = await new InvitationRepository().create(invitation);

    return JSON.stringify(result);
  }

  async getInvitation(id: string): Promise<string> {
    if (!id) {
      return JSON.stringify({ error: "id は必須項目です" });
    }
    const result = await new InvitationRepository().findOne(id);
    return JSON.stringify(result.Item);
  }
}
