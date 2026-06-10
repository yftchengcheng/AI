import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma';
import type { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    category?: string;
    search?: string;
    skip?: number;
    take?: number;
  }) {
    const where: Prisma.MarketplaceToolWhereInput = {
      status: 'approved',
    };

    if (params.category && params.category !== 'all') {
      where.category = params.category as any;
    }

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [tools, total] = await Promise.all([
      this.prisma.marketplaceTool.findMany({
        where,
        skip: params.skip ?? 0,
        take: params.take ?? 20,
        orderBy: { downloads: 'desc' },
      }),
      this.prisma.marketplaceTool.count({ where }),
    ]);

    return { tools, total };
  }

  findOne(id: string) {
    return this.prisma.marketplaceTool.findUnique({ where: { id } });
  }

  create(data: Prisma.MarketplaceToolCreateInput) {
    return this.prisma.marketplaceTool.create({ data });
  }
}
