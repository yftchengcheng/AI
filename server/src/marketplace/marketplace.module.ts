import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { MarketplaceService } from "./marketplace.service";
import { MarketplaceController } from "./marketplace.controller";

@Module({
  imports: [CommonModule],
  providers: [MarketplaceService],
  controllers: [MarketplaceController],
})
export class MarketplaceModule {}
