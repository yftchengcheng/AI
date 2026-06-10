import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { LlmService } from './llm';
import { AuthService } from './auth';

@Module({
  providers: [PrismaService, LlmService, AuthService],
  exports: [PrismaService, LlmService, AuthService],
})
export class CommonModule {}
