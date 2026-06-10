import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma";
import { LlmService } from "../common/llm";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required?: string[];
  };
}

/**
 * Skill execution engine.
 *
 * Takes a Skill definition and executes it as a real MCP-compatible tool.
 * Uses DeepSeek V4 Pro Function Calling to route user input → tool execution.
 */
@Injectable()
export class SkillExecutorService {
  constructor(
    private readonly llm: LlmService,
    private readonly prisma: PrismaService
  ) {}

  /**
   * Execute a skill by ID with the given input.
   * Returns the LLM response after processing through the skill's tool chain.
   */
  async execute(skillId: string, input: string): Promise<{
    skillName: string;
    input: string;
    output: string;
    toolCalls: string[];
  }> {
    // Load skill from DB (or seeded skill)
    const skill = await this.prisma.project.findFirst({
      where: { id: skillId, type: "skill" },
    });

    if (!skill) {
      throw new Error(`Skill ${skillId} not found`);
    }

    const config = skill.config as Record<string, unknown>;
    const capabilities = (config.capabilities as string[]) || [];
    const toolDefs = this.buildToolDefinitions(capabilities);

    // Build system prompt that describes available tools
    const systemPrompt = this.buildSystemPrompt(skill.name, config.description as string || "", toolDefs);

    // First, ask the LLM which tools to call
    const assistantThought = await this.llm.chat([
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ]);

    const toolCalls = this.parseToolCalls(assistantThought, toolDefs);

    // For now, simulate tool execution (Phase 1 uses LLM to "execute" tools)
    // In production, each tool would be a real MCP call
    const output = assistantThought;

    return {
      skillName: skill.name,
      input,
      output,
      toolCalls: toolCalls.map(t => t.name),
    };
  }

  /**
   * Execute a skill with streaming output (for real-time UI feedback).
   */
  async *executeStream(skillId: string, input: string): AsyncGenerator<{
    type: "thinking" | "tool_call" | "output";
    content: string;
  }> {
    const skill = await this.prisma.project.findFirst({
      where: { id: skillId, type: "skill" },
    });

    if (!skill) {
      yield { type: "output", content: `Skill ${skillId} not found` };
      return;
    }

    const config = skill.config as Record<string, unknown>;
    const capabilities = (config.capabilities as string[]) || [];
    const toolDefs = this.buildToolDefinitions(capabilities);
    const systemPrompt = this.buildSystemPrompt(skill.name, config.description as string || "", toolDefs);

    yield { type: "thinking", content: `正在加载 Skill: ${skill.name}...` };
    yield { type: "thinking", content: `可用工具: ${toolDefs.map(t => t.name).join(", ") || "无"}` };
    yield { type: "thinking", content: "正在调用 DeepSeek V4 Pro..." };

    let full = "";
    for await (const chunk of this.llm.chatStream([
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ])) {
      full += chunk;
      yield { type: "output", content: chunk };
    }
  }

  /**
   * Build Function Calling tool definitions from skill capabilities.
   */
  private buildToolDefinitions(capabilities: string[]): ToolDefinition[] {
    const registry: Record<string, ToolDefinition> = {
      "code-gen": {
        name: "generate_code",
        description: "根据描述生成代码。输入需求描述，返回完整的代码实现。",
        parameters: {
          type: "object",
          properties: {
            language: { type: "string", description: "目标编程语言" },
            requirement: { type: "string", description: "代码需求描述" },
          },
          required: ["requirement"],
        },
      },
      debug: {
        name: "diagnose_error",
        description: "分析和修复代码错误。输入错误日志或代码片段。",
        parameters: {
          type: "object",
          properties: {
            error_log: { type: "string", description: "错误日志" },
            code_snippet: { type: "string", description: "相关代码片段(可选)" },
          },
          required: ["error_log"],
        },
      },
      refactor: {
        name: "refactor_code",
        description: "重构优化已有代码结构。",
        parameters: {
          type: "object",
          properties: {
            code: { type: "string", description: "需要重构的代码" },
            goal: { type: "string", description: "重构目标: performance|readability|modularity" },
          },
          required: ["code"],
        },
      },
      doc: {
        name: "generate_docs",
        description: "自动生成 API 文档或代码注释。",
        parameters: {
          type: "object",
          properties: {
            code: { type: "string", description: "需要生成文档的代码" },
            format: { type: "string", description: "文档格式: markdown|jsdoc|openapi" },
          },
          required: ["code"],
        },
      },
      test: {
        name: "generate_tests",
        description: "自动编写单元测试。",
        parameters: {
          type: "object",
          properties: {
            code: { type: "string", description: "需要测试的代码" },
            framework: { type: "string", description: "测试框架: jest|vitest|pytest" },
          },
          required: ["code"],
        },
      },
      deploy: {
        name: "deploy_integration",
        description: "CI/CD 部署集成配置生成。",
        parameters: {
          type: "object",
          properties: {
            platform: { type: "string", description: "部署平台: vercel|ecs|k8s" },
            config: { type: "string", description: "部署配置描述" },
          },
          required: ["platform"],
        },
      },
    };

    return capabilities
      .filter(c => registry[c])
      .map(c => registry[c]);
  }

  /**
   * Build system prompt that instructs the model how to use available tools.
   */
  private buildSystemPrompt(skillName: string, description: string, tools: ToolDefinition[]): string {
    const toolList = tools
      .map(t => `- ${t.name}: ${t.description}`)
      .join("\n");

    return `你是一个名为 "${skillName}" 的 AI Skill。
${description ? `描述: ${description}` : ""}

你可以使用以下工具:
${toolList || "无特殊工具，请根据用户输入直接回答。"}

当用户提出问题或任务时:
1. 分析用户意图
2. 选择合适的工具
3. 生成对应的代码/配置/文档
4. 提供清晰的解释

请用中文回答，代码用对应语言的语法高亮标记。`;
  }

  /**
   * Parse tool calls from LLM output (simple heuristic for Phase 1).
   * In production, use proper Function Calling via API.
   */
  private parseToolCalls(output: string, tools: ToolDefinition[]): ToolDefinition[] {
    return tools.filter(t => output.toLowerCase().includes(t.name.toLowerCase()));
  }
}
