import { Controller, Post, Get, Delete, Body, Param, Query } from "@nestjs/common";
import { MemoryService } from "./memory.service";

@Controller("api/memory")
export class MemoryController {
  constructor(private readonly memory: MemoryService) {}

  /** Add a message to short-term memory */
  @Post("short-term")
  addShortTerm(
    @Body() body: { sessionId: string; role: string; content: string }
  ) {
    this.memory.addToShortTerm(body.sessionId, body.role, body.content);
    return { ok: true };
  }

  /** Get short-term memory for a session */
  @Get("short-term/:sessionId")
  getShortTerm(@Param("sessionId") sessionId: string) {
    return { messages: this.memory.getShortTerm(sessionId) };
  }

  /** Store a fact in long-term memory */
  @Post("long-term")
  async addLongTerm(
    @Body() body: { userId: string; content: string; agentId?: string }
  ) {
    await this.memory.addToLongTerm(body.userId, body.content, {
      agentId: body.agentId,
    });
    return { ok: true };
  }

  /** Semantic recall from long-term memory */
  @Post("recall")
  async recall(
    @Body() body: { userId: string; query: string; topK?: number }
  ) {
    const results = await this.memory.recall(body.userId, body.query, body.topK);
    return { results };
  }

  /** Build full agent context (short + long) */
  @Post("context")
  async buildContext(
    @Body() body: { userId: string; sessionId: string; message: string }
  ) {
    return this.memory.buildContext(body.userId, body.sessionId, body.message);
  }

  /** List long-term memories for a user */
  @Get("entries/:userId")
  async listMemories(@Param("userId") userId: string) {
    const entries = await this.memory.listMemories(userId);
    return { entries };
  }

  /** Clear short-term session */
  @Delete("short-term/:sessionId")
  clearShortTerm(@Param("sessionId") sessionId: string) {
    this.memory.clearShortTerm(sessionId);
    return { ok: true };
  }
}
