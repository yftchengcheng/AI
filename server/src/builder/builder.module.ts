import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { BuilderService } from "./builder.service";
import { BuilderGateway } from "./builder.gateway";

@Module({
  imports: [CommonModule],
  providers: [BuilderService, BuilderGateway],
  exports: [BuilderService],
})
export class BuilderModule {}
