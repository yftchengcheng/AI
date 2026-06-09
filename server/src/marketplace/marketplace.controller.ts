import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { MarketplaceService } from "./marketplace.service";

@Controller("api/marketplace")
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get()
  findAll(
    @Query("category") category?: string,
    @Query("search") search?: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string
  ) {
    return this.marketplaceService.findAll({
      category,
      search,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.marketplaceService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.marketplaceService.create(body);
  }
}
