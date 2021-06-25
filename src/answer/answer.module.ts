import { Module } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";
import { InvitationModule } from "src/invitation/invitation.module";

@Module({
  imports: [InvitationModule],
  providers: [AnswerService],
  exports: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
