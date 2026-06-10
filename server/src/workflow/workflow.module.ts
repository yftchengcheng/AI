import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { WorkflowEngineService } from './workflow-engine.service';
import { NodeExecutorService } from './node-executor.service';
import { WorkflowController } from './workflow.controller';
import { WorkflowGateway } from './workflow.gateway';

@Module({
  imports: [CommonModule],
  providers: [WorkflowEngineService, NodeExecutorService, WorkflowGateway],
  controllers: [WorkflowController],
  exports: [WorkflowEngineService],
})
export class WorkflowModule {}
