import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { InvitationModule } from "./invitation/invitation.module";
import { AnswerModule } from "./answer/answer.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.development`, `.env`],
    }),
    InvitationModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
