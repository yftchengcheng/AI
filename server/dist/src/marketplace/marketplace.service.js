"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../common/prisma");
let MarketplaceService = class MarketplaceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const where = {
            status: "approved",
        };
        if (params.category && params.category !== "all") {
            where.category = params.category;
        }
        if (params.search) {
            where.OR = [
                { name: { contains: params.search, mode: "insensitive" } },
                { description: { contains: params.search, mode: "insensitive" } },
            ];
        }
        const [tools, total] = await Promise.all([
            this.prisma.marketplaceTool.findMany({
                where,
                skip: params.skip ?? 0,
                take: params.take ?? 20,
                orderBy: { downloads: "desc" },
            }),
            this.prisma.marketplaceTool.count({ where }),
        ]);
        return { tools, total };
    }
    findOne(id) {
        return this.prisma.marketplaceTool.findUnique({ where: { id } });
    }
    create(data) {
        return this.prisma.marketplaceTool.create({ data });
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map