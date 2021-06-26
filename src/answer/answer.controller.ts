import {
  Body,
  Req,
  Controller,
  Post,
  Get,
  Query,
  NotAcceptableException,
} from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { Request } from "express";

const API_KEY = process.env.API_KEY;

@Controller("Answer")
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Post()
  async createAnswer(@Body() body, @Req() request: Request) {
    this.checkApiKey(request);
    return await this.service.createAnswer(body);
  }

  @Get()
  async getAnswers(@Query() query: { id: string }, @Req() request: Request) {
    this.checkApiKey(request);
    return await this.service.getAnswers(query.id);
  }

  private checkApiKey(request: Request): void {
    if ((request.headers["x-api-key"] as string) !== API_KEY) {
      throw new NotAcceptableException("API KEY ERROR");
    }
  }
}
