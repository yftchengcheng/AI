import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';
import { RagService } from './rag.service';
import { DocumentService } from './document.service';
import { KnowledgeController } from './knowledge.controller';

@Module({
  imports: [CommonModule],
  providers: [
    EmbeddingService,
    VectorStoreService,
    RagService,
    DocumentService,
  ],
  controllers: [KnowledgeController],
  exports: [RagService],
})
export class KnowledgeModule {}
