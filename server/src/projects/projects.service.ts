import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma";
import type { Prisma } from "../../generated/prisma/client.js";

import("../../generated/prisma/client.js");

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

  /** Publish project: set visibility to public + create marketplace entry */
  async publish(projectId: string) {
    const project = await this.prisma.project.update({
      where: { id: projectId },
      data: { visibility: "public" },
    });

    // Upsert marketplace tool
    const existing = await this.prisma.marketplaceTool.findUnique({
      where: { projectId },
    });

    if (existing) {
      return { project, marketplaceTool: existing };
    }

    const tool = await this.prisma.marketplaceTool.create({
      data: {
        projectId: project.id,
        userId: project.userId,
        name: project.name,
        description: project.description || "",
        category: project.type,
        tags: [],
        status: "pending",
      },
    });

    return { project, marketplaceTool: tool };
  }
}
