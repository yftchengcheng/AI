import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";
import { DiagnosticsService } from "./diagnostics.service";

@Controller("api/diagnostics")
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) {}

  @Post("analyze")
  async analyze(
    @Body() body: { type: string; input: string },
    @Res() res: Response
  ) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of this.diagnosticsService.analyze(
      body.type,
      body.input
    )) {
      res.write(chunk);
    }
    res.end();
  }
}
