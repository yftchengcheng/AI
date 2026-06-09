import { MarketplaceService } from "./marketplace.service";
export declare class MarketplaceController {
    private readonly marketplaceService;
    constructor(marketplaceService: MarketplaceService);
    findAll(category?: string, search?: string, skip?: string, take?: string): Promise<{
        tools: any;
        total: any;
    }>;
    findOne(id: string): any;
    create(body: any): any;
}
