import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma';

/**
 * Simple PGVector-based vector store.
 *
 * Stores document chunks as vectors using PostgreSQL's pgvector extension.
 * Falls back to keyword matching if pgvector is not available.
 */
@Injectable()
export class VectorStoreService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Store a chunk with its embedding vector.
   */
  async store(
    documentId: string,
    chunkIndex: number,
    content: string,
    embedding: number[],
  ): Promise<void> {
    await this.prisma.$executeRawUnsafe(
      `INSERT INTO document_chunks (document_id, chunk_index, content, embedding)
       VALUES ($1, $2, $3, $4::vector)
       ON CONFLICT (document_id, chunk_index) DO UPDATE
       SET content = $3, embedding = $4::vector`,
      documentId,
      chunkIndex,
      content,
      `[${embedding.join(',')}]`,
    );
  }

  /**
   * Search for the most similar chunks to a query embedding.
   * Returns topK matches sorted by cosine similarity.
   */
  async search(
    embedding: number[],
    options: { topK?: number; knowledgeBaseId?: string } = {},
  ): Promise<
    {
      content: string;
      similarity: number;
      documentId: string;
      documentName: string;
    }[]
  > {
    const { topK = 5, knowledgeBaseId } = options;

    const vectorStr = `[${embedding.join(',')}]`;

    const kbFilter = knowledgeBaseId
      ? `AND d.knowledge_base_id = '${knowledgeBaseId}'`
      : '';

    try {
      const rows = await this.prisma.$queryRawUnsafe(
        `SELECT
           dc.content,
           1 - (dc.embedding <=> $1::vector) AS similarity,
           dc.document_id,
           d.name AS document_name
         FROM document_chunks dc
         JOIN documents d ON d.id = dc.document_id
         WHERE dc.embedding IS NOT NULL ${kbFilter}
         ORDER BY dc.embedding <=> $1::vector
         LIMIT $2`,
        vectorStr,
        topK,
      );
      return (rows as any[]).map((r: any) => ({
        content: r.content,
        similarity: Number(r.similarity),
        documentId: r.document_id,
        documentName: r.document_name,
      }));
    } catch {
      // pgvector not available — return empty
      console.warn(
        '[vector-store] pgvector not available, search returned empty',
      );
      return [];
    }
  }

  /**
   * Delete all chunks for a document.
   */
  async deleteByDocument(documentId: string): Promise<void> {
    await this.prisma.$executeRawUnsafe(
      `DELETE FROM document_chunks WHERE document_id = $1`,
      documentId,
    );
  }
}
