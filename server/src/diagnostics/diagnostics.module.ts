import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { DiagnosticsService } from "./diagnostics.service";
import { DiagnosticsController } from "./diagnostics.controller";

@Module({
  imports: [CommonModule],
  providers: [DiagnosticsService],
  controllers: [DiagnosticsController],
})
export class DiagnosticsModule {}
