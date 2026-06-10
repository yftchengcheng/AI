import { Injectable } from '@nestjs/common';
import { createOpenAI } from '@ai-sdk/openai';

@Injectable()
export class LlmService {
  private client: ReturnType<typeof createOpenAI>;

  constructor() {
    const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-placeholder';
    const baseURL =
      process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';

    this.client = createOpenAI({
      apiKey,
      baseURL,
    });
  }

  /**
   * Returns the OpenAI-compatible client configured for DeepSeek V4 Pro.
   * Use with Vercel AI SDK's `generateText()` or `streamText()`.
   */
  getClient() {
    return this.client;
  }

  /**
   * Convenience: chat completion with DeepSeek.
   * Returns the generated text content.
   */
  async chat(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    options?: { maxTokens?: number; temperature?: number },
  ): Promise<string> {
    const model = this.client('deepseek-chat');
    const { generateText } = await import('ai');
    const result = await generateText({
      model,
      messages,
      maxOutputTokens: options?.maxTokens ?? 4096,
      temperature: options?.temperature ?? 0.7,
    });
    return result.text;
  }

  /**
   * Streaming chat — for real-time Builder / Diagnostics output.
   */
  async *chatStream(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  ): AsyncGenerator<string> {
    const model = this.client('deepseek-chat');
    const { streamText } = await import('ai');
    const { textStream } = streamText({
      model,
      messages,
    });
    for await (const chunk of textStream) {
      yield chunk;
    }
  }
}
