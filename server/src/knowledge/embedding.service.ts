import { Injectable } from "@nestjs/common";

/**
 * Embedding service — uses DeepSeek V4 Pro's embedding API to generate
 * vector representations of text chunks for semantic search.
 *
 * DeepSeek supports OpenAI-compatible embeddings endpoint:
 * POST https://api.deepseek.com/v1/embeddings
 */
@Injectable()
export class EmbeddingService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || "";
    this.baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
  }

  /**
   * Generate embeddings for a batch of texts.
   * Returns 1536-dimensional float vectors.
   */
  async embed(texts: string[]): Promise<number[][]> {
    if (!this.apiKey) {
      // Fallback: return zero vectors for development without API key
      console.warn("[embedding] No DEEPSEEK_API_KEY set, using zero vectors");
      return texts.map(() => new Array(1536).fill(0));
    }

    try {
      const res = await fetch(`${this.baseUrl}/embeddings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          input: texts,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Embedding API error: ${err}`);
      }

      const json = await res.json() as {
        data: { embedding: number[]; index: number }[];
      };
      return json.data
        .sort((a, b) => a.index - b.index)
        .map((d) => d.embedding);
    } catch (err: any) {
      console.error(`[embedding] Failed: ${err.message}`);
      // Fallback zero vectors
      return texts.map(() => new Array(1536).fill(0));
    }
  }

  /**
   * Generate a single embedding vector.
   */
  async embedSingle(text: string): Promise<number[]> {
    const results = await this.embed([text]);
    return results[0];
  }
}
