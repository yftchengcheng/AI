import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { WorkflowEngineService } from "./workflow-engine.service";

@Controller("api/workflows")
export class WorkflowController {
  constructor(private readonly engine: WorkflowEngineService) {}

  /** Execute a workflow definition with input */
  @Post("execute")
  async execute(
    @Body() body: {
      definition: { nodes: any[]; edges: any[] };
      input: Record<string, unknown>;
    }
  ) {
    return this.engine.execute(body.definition, body.input);
  }
}
