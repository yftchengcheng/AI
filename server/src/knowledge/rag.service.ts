import { Injectable } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';
import { LlmService } from '../common/llm';

/**
 * RAG (Retrieval-Augmented Generation) service.
 *
 * Full pipeline:
 * 1. User asks a question
 * 2. Question → embedding vector
 * 3. Vector search → topK relevant chunks from knowledge base
 * 4. Chunks + question → LLM generates answer with citations
 */
@Injectable()
export class RagService {
  constructor(
    private readonly embedding: EmbeddingService,
    private readonly vectorStore: VectorStoreService,
    private readonly llm: LlmService,
  ) {}

  /**
   * Query the knowledge base: search + generate answer.
   */
  async query(
    question: string,
    options: { knowledgeBaseId?: string; topK?: number } = {},
  ): Promise<{
    answer: string;
    sources: { content: string; documentName: string; similarity: number }[];
  }> {
    // 1. Embed the question
    const questionEmbedding = await this.embedding.embedSingle(question);

    // 2. Search for relevant chunks
    const sources = await this.vectorStore.search(questionEmbedding, {
      topK: options.topK ?? 5,
      knowledgeBaseId: options.knowledgeBaseId,
    });

    // 3. Build context from retrieved chunks
    const context = sources
      .map((s, i) => `[来源${i + 1}: ${s.documentName}]\n${s.content}`)
      .join('\n\n');

    // 4. Generate answer with LLM
    const answer =
      sources.length > 0
        ? await this.llm.chat([
            {
              role: 'system',
              content: `你是一个知识库问答助手。请根据以下参考资料回答用户的问题。如果答案无法从参考资料中得出，请明确告知用户。引用来源时使用 [来源N] 标记。

参考资料:
${context}`,
            },
            { role: 'user', content: question },
          ])
        : '知识库中暂无相关内容，请尝试其他问题或上传更多文档。';

    return { answer, sources };
  }

  /**
   * Streaming version of query — yields chunks as they arrive.
   */
  async *queryStream(
    question: string,
    options: { knowledgeBaseId?: string; topK?: number } = {},
  ): AsyncGenerator<{
    type: 'searching' | 'sources' | 'answer';
    content: string;
  }> {
    yield { type: 'searching', content: '正在检索知识库...' };

    const questionEmbedding = await this.embedding.embedSingle(question);
    const sources = await this.vectorStore.search(questionEmbedding, {
      topK: options.topK ?? 5,
      knowledgeBaseId: options.knowledgeBaseId,
    });

    yield {
      type: 'sources',
      content: `找到 ${sources.length} 个相关片段`,
    };

    if (sources.length === 0) {
      yield { type: 'answer', content: '知识库中暂无相关内容。' };
      return;
    }

    const context = sources
      .map((s, i) => `[来源${i + 1}: ${s.documentName}]\n${s.content}`)
      .join('\n\n');

    yield {
      type: 'searching',
      content: '正在调用 DeepSeek V4 Pro 生成回答...',
    };

    for await (const chunk of this.llm.chatStream([
      {
        role: 'system',
        content: `你是知识库问答助手。根据参考资料回答问题，引用来源。[来源N]。\n\n参考资料:\n${context}`,
      },
      { role: 'user', content: question },
    ])) {
      yield { type: 'answer', content: chunk };
    }
  }
}
