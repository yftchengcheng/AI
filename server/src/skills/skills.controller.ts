import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  Query,
} from "@nestjs/common";
import { Response } from "express";
import { SkillExecutorService } from "./skill-executor.service";
import { SkillRegistryService } from "./skill-registry.service";

@Controller("api/skills")
export class SkillsController {
  constructor(
    private readonly executor: SkillExecutorService,
    private readonly registry: SkillRegistryService
  ) {}

  /** Execute a skill with given input */
  @Post(":id/execute")
  async execute(
    @Param("id") id: string,
    @Body() body: { input: string }
  ) {
    return this.executor.execute(id, body.input);
  }

  /** Execute a skill with SSE streaming output */
  @Post(":id/execute-stream")
  async executeStream(
    @Param("id") id: string,
    @Body() body: { input: string },
    @Res() res: Response
  ) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const event of this.executor.executeStream(id, body.input)) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
    res.end();
  }

  /** Get registry status */
  @Get("status")
  getStatus() {
    return this.registry.getStatus();
  }

  /** List all loaded skills */
  @Get("loaded")
  getLoaded() {
    return { skills: this.registry.getLoaded() };
  }
}
