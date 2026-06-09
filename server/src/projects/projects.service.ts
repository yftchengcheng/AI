import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma";
import type { Prisma } from "../../generated/prisma/client.js";

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  findOne(id: string, userId: string) {
    return this.prisma.project.findFirst({
      where: { id, userId },
    });
  }

  create(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({ data });
  }

  update(id: string, data: Prisma.ProjectUpdateInput) {
    return this.prisma.project.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
