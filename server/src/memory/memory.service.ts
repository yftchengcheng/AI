import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma";
import { EmbeddingService } from "../knowledge/embedding.service";
import { VectorStoreService } from "../knowledge/vector-store.service";

export interface MemoryEntry {
  id: string;
  userId: string;
  agentId?: string;
  type: "session" | "long_term";
  role: "user" | "assistant" | "system";
  content: string;
  embedding?: number[];
  createdAt: Date;
  expiresAt?: Date;
}

/**
 * Memory system for Agents.
 *
 * Two-tier memory:
 * 1. Short-term: in-memory Map (per-session conversation context)
 * 2. Long-term: PGVector-persisted semantic memory
 */
@Injectable()
export class MemoryService {
  // Short-term memory: sessionId → message list
  private shortTerm = new Map<string, { role: string; content: string; timestamp: number }[]>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: EmbeddingService,
    private readonly vectorStore: VectorStoreService
  ) {}

  /** Add a message to short-term memory */
  addToShortTerm(sessionId: string, role: string, content: string, maxTurns = 20): void {
    const history = this.shortTerm.get(sessionId) || [];
    history.push({ role, content, timestamp: Date.now() });

    // Trim to max turns
    if (history.length > maxTurns * 2) {
      history.splice(0, history.length - maxTurns * 2);
    }

    this.shortTerm.set(sessionId, history);

    // Auto-expire after 30 min
    setTimeout(() => this.clearShortTerm(sessionId), 30 * 60 * 1000);
  }

  /** Get recent conversation context */
  getShortTerm(sessionId: string): { role: string; content: string }[] {
    return this.shortTerm.get(sessionId) || [];
  }

  /** Clear session memory */
  clearShortTerm(sessionId: string): void {
    this.shortTerm.delete(sessionId);
  }

  /**
   * Store a fact in long-term memory (vector DB).
   * Important user preferences, decisions, or key facts extracted from conversation.
   */
  async addToLongTerm(
    userId: string,
    content: string,
    options: { agentId?: string; type?: string } = {}
  ): Promise<void> {
    const embedding = await this.embedding.embedSingle(content);

    await this.prisma.$executeRawUnsafe(
      `INSERT INTO memory_entries (id, user_id, agent_id, type, role, content, embedding, created_at)
       VALUES (gen_random_uuid()::text, $1, $2, $3, 'system', $4, $5::vector, NOW())`,
      userId,
      options.agentId || null,
      options.type || "long_term",
      content,
      `[${embedding.join(",")}]`
    );
  }

  /**
   * Retrieve relevant long-term memories for a query.
   * Uses semantic search via PGVector.
   */
  async recall(userId: string, query: string, topK = 5): Promise<{ content: string; similarity: number }[]> {
    const queryEmbedding = await this.embedding.embedSingle(query);
    const vectorStr = `[${queryEmbedding.join(",")}]`;

    try {
      const rows = await this.prisma.$queryRawUnsafe(
        `SELECT content, 1 - (embedding <=> $1::vector) AS similarity
         FROM memory_entries
         WHERE user_id = $2 AND embedding IS NOT NULL
         ORDER BY embedding <=> $1::vector
         LIMIT $3`,
        vectorStr,
        userId,
        topK
      );
      return rows.map((r: any) => ({
        content: r.content,
        similarity: Number(r.similarity),
      }));
    } catch {
      return [];
    }
  }

  /**
   * Build full context for an Agent conversation:
   * - Recent short-term messages
   * - Recalled long-term memories (injected as system context)
   */
  async buildContext(
    userId: string,
    sessionId: string,
    currentMessage: string,
    options: { maxShortTurns?: number; maxLongRecall?: number } = {}
  ): Promise<{
    systemContext: string;
    messages: { role: string; content: string }[];
  }> {
    const shortTerm = this.getShortTerm(sessionId);
    const recent = shortTerm.slice(-(options.maxShortTurns || 10));

    const longMemories = await this.recall(userId, currentMessage, options.maxLongRecall || 3);

    let systemContext = "";
    if (longMemories.length > 0) {
      systemContext = "相关历史记忆:\n" + longMemories.map((m, i) => `${i + 1}. ${m.content}`).join("\n");
    }

    return {
      systemContext,
      messages: recent.map(m => ({ role: m.role, content: m.content })),
    };
  }

  /** Delete a specific memory entry */
  async deleteMemory(entryId: string): Promise<void> {
    await this.prisma.$executeRawUnsafe(
      `DELETE FROM memory_entries WHERE id = $1`,
      entryId
    );
  }

  /** List all long-term memories for a user */
  async listMemories(userId: string): Promise<MemoryEntry[]> {
    try {
      const rows = await this.prisma.$queryRawUnsafe(
        `SELECT id, user_id, agent_id, type, role, content, created_at
         FROM memory_entries
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 50`,
        userId
      );
      return rows.map((r: any) => ({
        id: r.id,
        userId: r.user_id,
        agentId: r.agent_id,
        type: r.type,
        role: r.role,
        content: r.content,
        createdAt: new Date(r.created_at),
      }));
    } catch {
      return [];
    }
  }
}
