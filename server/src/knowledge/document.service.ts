import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';

/**
 * Document service — handles upload, parsing, chunking, and embedding pipeline.
 */
@Injectable()
export class DocumentService {
  // Rough chunk size in characters (not tokens — a pragmatic approximation)
  private readonly CHUNK_SIZE = 800;
  private readonly CHUNK_OVERLAP = 100;

  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: EmbeddingService,
    private readonly vectorStore: VectorStoreService,
  ) {}

  /**
   * Process a raw text document:
   * 1. Parse
   * 2. Split into chunks
   * 3. Generate embeddings
   * 4. Store in vector DB
   */
  async processDocument(
    knowledgeBaseId: string,
    name: string,
    content: string,
    type: string = 'txt',
  ): Promise<{ documentId: string; chunkCount: number }> {
    // Create document record
    const doc = await this.prisma.$executeRawUnsafe(
      `INSERT INTO documents (id, knowledge_base_id, name, type, status, created_at)
       VALUES (gen_random_uuid()::text, $1, $2, $3, 'processing', NOW())
       RETURNING id`,
      knowledgeBaseId,
      name,
      type,
    );

    // TODO: fix raw query to return id
    // For now, generate ID client-side
    const crypto = await import('crypto');
    const documentId = crypto.randomUUID();

    await this.prisma.$executeRawUnsafe(
      `INSERT INTO documents (id, knowledge_base_id, name, type, status, created_at)
       VALUES ($1, $2, $3, $4, 'processing', NOW())`,
      documentId,
      knowledgeBaseId,
      name,
      type,
    );

    // Parse content
    const text = this.extractText(content, type);
    const chunks = this.splitChunks(text);

    // Generate embeddings and store
    const embeddings = await this.embedding.embed(chunks);
    for (let i = 0; i < chunks.length; i++) {
      await this.vectorStore.store(documentId, i, chunks[i], embeddings[i]);
    }

    // Update document status
    await this.prisma.$executeRawUnsafe(
      `UPDATE documents SET status = 'ready' WHERE id = $1`,
      documentId,
    );

    return { documentId, chunkCount: chunks.length };
  }

  /**
   * Delete a document and its chunks.
   */
  async deleteDocument(documentId: string): Promise<void> {
    await this.vectorStore.deleteByDocument(documentId);
    await this.prisma.$executeRawUnsafe(
      `DELETE FROM documents WHERE id = $1`,
      documentId,
    );
  }

  /**
   * Chunk text into overlapping segments.
   */
  splitChunks(text: string): string[] {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
      const end = Math.min(start + this.CHUNK_SIZE, text.length);
      chunks.push(text.slice(start, end));
      start += this.CHUNK_SIZE - this.CHUNK_OVERLAP;
    }
    return chunks;
  }

  /**
   * Extract raw text from various formats.
   * For MVP, handles plain text and simple markdown stripping.
   */
  private extractText(content: string, type: string): string {
    if (type === 'md' || type === 'markdown') {
      // Simple markdown → plain text conversion
      return content
        .replace(/^#{1,6}\s+/gm, '') // strip headings
        .replace(/\*\*(.+?)\*\*/g, '$1') // bold
        .replace(/\*(.+?)\*/g, '$1') // italic
        .replace(/`{1,3}[^`]*`{1,3}/g, '') // code blocks
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/!\[.*?\]\([^)]+\)/g, '') // images
        .trim();
    }
    // Default: plain text
    return content.trim();
  }
}
