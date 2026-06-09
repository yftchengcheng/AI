import { LlmService } from "../common/llm";
import { PrismaService } from "../common/prisma";
export declare class BuilderService {
    private readonly llm;
    private readonly prisma;
    constructor(llm: LlmService, prisma: PrismaService);
    build(projectId: string, userId: string): AsyncGenerator<{
        type: "progress" | "done" | "error";
        content: string;
    }>;
}
