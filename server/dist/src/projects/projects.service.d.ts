import { PrismaService } from "../common/prisma";
import type { Prisma } from "../../generated/prisma/client.js";
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): any;
    findOne(id: string, userId: string): any;
    create(data: Prisma.ProjectCreateInput): any;
    update(id: string, data: Prisma.ProjectUpdateInput): any;
    remove(id: string): any;
}
