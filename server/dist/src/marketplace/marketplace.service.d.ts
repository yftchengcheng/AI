import { PrismaService } from "../common/prisma";
import type { Prisma } from "../../generated/prisma/client.js";
export declare class MarketplaceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        category?: string;
        search?: string;
        skip?: number;
        take?: number;
    }): Promise<{
        tools: any;
        total: any;
    }>;
    findOne(id: string): any;
    create(data: Prisma.MarketplaceToolCreateInput): any;
}
