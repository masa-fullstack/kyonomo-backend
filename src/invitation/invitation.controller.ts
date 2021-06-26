import {
  Body,
  Req,
  Controller,
  Post,
  Get,
  NotAcceptableException,
  Query,
} from "@nestjs/common";
import { InvitationService } from "./invitation.service";
import { Request } from "express";

const API_KEY = process.env.API_KEY;

@Controller("Invitation")
export class InvitationController {
  constructor(private readonly service: InvitationService) {}

  @Post()
  async createInvitation(@Body() body, @Req() request: Request) {
    this.checkApiKey(request);
    return await this.service.createInvitation(body);
  }

  @Get()
  async getInvitation(@Query() query: { id: string }, @Req() request: Request) {
    this.checkApiKey(request);
    return await this.service.getInvitation(query.id);
  }

  @Get("/check")
  async checkInvitation(
    @Query() query: { id: string },
    @Req() request: Request
  ) {
    this.checkApiKey(request);
    return await this.service.checkInvitation(query.id);
  }

  private checkApiKey(request: Request): void {
    if ((request.headers["x-api-key"] as string) !== API_KEY) {
      throw new NotAcceptableException("API KEY ERROR");
    }
  }
}
