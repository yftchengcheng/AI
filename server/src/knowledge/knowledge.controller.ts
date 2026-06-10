import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { RagService } from './rag.service';
import { DocumentService } from './document.service';

@Controller('api/knowledge')
export class KnowledgeController {
  constructor(
    private readonly rag: RagService,
    private readonly documents: DocumentService,
  ) {}

  /** Query the knowledge base */
  @Post('query')
  async query(
    @Body() body: { question: string; knowledgeBaseId?: string; topK?: number },
  ) {
    return this.rag.query(body.question, {
      knowledgeBaseId: body.knowledgeBaseId,
      topK: body.topK,
    });
  }

  /** Query with streaming answer */
  @Post('query-stream')
  async queryStream(
    @Body() body: { question: string; knowledgeBaseId?: string },
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const event of this.rag.queryStream(body.question, {
      knowledgeBaseId: body.knowledgeBaseId,
    })) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
    res.end();
  }

  /** Upload a document to a knowledge base */
  @Post('documents')
  async uploadDocument(
    @Body()
    body: {
      knowledgeBaseId: string;
      name: string;
      content: string;
      type?: string;
    },
  ) {
    return this.documents.processDocument(
      body.knowledgeBaseId,
      body.name,
      body.content,
      body.type ?? 'txt',
    );
  }

  /** Delete a document */
  @Delete('documents/:id')
  async deleteDocument(@Param('id') id: string) {
    return this.documents.deleteDocument(id);
  }

  /** List knowledge bases */
  @Get('bases')
  async listBases() {
    // TODO: query from DB when knowledge_base table is migrated
    return { bases: [] };
  }

  /** Create a knowledge base */
  @Post('bases')
  async createBase(@Body() body: { name: string; description?: string }) {
    // TODO: insert into DB
    return { id: 'temp-id', name: body.name, description: body.description };
  }
}
