import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { KnowledgeModule } from "../knowledge/knowledge.module";
import { MemoryService } from "./memory.service";
import { MemoryController } from "./memory.controller";

@Module({
  imports: [CommonModule, KnowledgeModule],
  providers: [MemoryService],
  controllers: [MemoryController],
  exports: [MemoryService],
})
export class MemoryModule {}
