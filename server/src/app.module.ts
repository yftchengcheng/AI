import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
import { ProjectsModule } from "./projects/projects.module";
import { BuilderModule } from "./builder/builder.module";
import { DiagnosticsModule } from "./diagnostics/diagnostics.module";
import { MarketplaceModule } from "./marketplace/marketplace.module";
import { UserModule } from "./user/user.module";
import { SkillsModule } from "./skills/skills.module";
import { KnowledgeModule } from "./knowledge/knowledge.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    ProjectsModule,
    BuilderModule,
    DiagnosticsModule,
    MarketplaceModule,
    UserModule,
    SkillsModule,
    KnowledgeModule,
  ],
})
export class AppModule {}
