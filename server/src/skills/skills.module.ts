import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { SkillExecutorService } from './skill-executor.service';
import { SkillRegistryService } from './skill-registry.service';
import { SkillsController } from './skills.controller';

@Module({
  imports: [CommonModule],
  providers: [SkillExecutorService, SkillRegistryService],
  controllers: [SkillsController],
  exports: [SkillExecutorService],
})
export class SkillsModule {}
