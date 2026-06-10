import { Injectable } from '@nestjs/common';
import { LlmService } from '../common/llm';
import { PrismaService } from '../common/prisma';

const BUILDER_PROMPTS: Record<string, string> = {
  app: `你是一个专业的移动应用架构师。根据以下配置，生成完整的移动应用代码：
- 框架：{framework}
- 平台：{platform}
- 功能：{features}

请生成：
1. 项目目录结构
2. 核心页面代码
3. 配置文件

输出格式为 Markdown，代码块标注语言。`,

  miniapp: `你是一个小程序开发专家。根据以下配置，生成小程序代码：
- 平台：{type}
- 框架：{framework}
- 业务场景：{scenes}

请生成完整的小程序代码，包括 app.json、核心页面和组件。`,

  web: `你是一个 Web 前端架构师。根据以下配置，生成 Web 应用代码：
- 框架：{framework}
- 样式：{styling}
- 页面：{pages}

请生成完整的项目代码，包括路由、页面和组件。`,

  skill: `你是一个 AI Skill 设计专家。根据以下配置，生成 Skill 定义：
- 名称：{name}
- 描述：{description}
- 能力：{capabilities}

请生成 MCP 兼容的 Skill manifest：
1. skill.json（名称、描述、工具定义）
2. 核心工具实现伪代码
3. README 使用说明`,

  agent: `你是一个 AI Agent 架构师。根据以下配置，生成 Agent 定义：
- 名称：{name}
- 角色：{systemPrompt}
- 工具：{tools}
- 模型：{model}

请生成完整的 Agent 配置文件和使用指南。`,
};

@Injectable()
export class BuilderService {
  constructor(
    private readonly llm: LlmService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Generate code/config based on project type and user config.
   * Returns the generated text stream async iterable.
   */
  async *build(
    projectId: string,
    userId: string,
  ): AsyncGenerator<{ type: 'progress' | 'done' | 'error'; content: string }> {
    // 1. Load project
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });
    if (!project) {
      yield { type: 'error', content: '项目未找到' };
      return;
    }

    // 2. Mark building
    await this.prisma.project.update({
      where: { id: projectId },
      data: { status: 'building' },
    });

    yield { type: 'progress', content: '正在分析项目配置...' };

    // 3. Build prompt
    const template = BUILDER_PROMPTS[project.type] ?? BUILDER_PROMPTS.web;
    const prompt = template
      .replace('{framework}', String(project.config?.framework ?? 'N/A'))
      .replace('{platform}', String(project.config?.platform ?? 'N/A'))
      .replace('{features}', JSON.stringify(project.config?.features ?? []))
      .replace('{type}', String(project.config?.type ?? 'N/A'))
      .replace('{scenes}', JSON.stringify(project.config?.scenes ?? []))
      .replace('{styling}', String(project.config?.styling ?? 'N/A'))
      .replace('{pages}', JSON.stringify(project.config?.pages ?? []))
      .replace('{name}', project.name)
      .replace('{description}', project.description)
      .replace(
        '{capabilities}',
        JSON.stringify(project.config?.capabilities ?? []),
      )
      .replace('{systemPrompt}', String(project.config?.systemPrompt ?? ''))
      .replace('{tools}', JSON.stringify(project.config?.tools ?? []))
      .replace('{model}', String(project.config?.model ?? 'deepseek-v4'));

    yield { type: 'progress', content: '正在调用 DeepSeek V4 Pro 生成代码...' };

    // 4. Stream LLM generation
    let fullOutput = '';
    try {
      for await (const chunk of this.llm.chatStream([
        {
          role: 'system',
          content: '你是一个专业代码生成器。只输出代码和配置，不要闲聊。',
        },
        { role: 'user', content: prompt },
      ])) {
        fullOutput += chunk;
        yield { type: 'progress', content: chunk };
      }
    } catch (err: any) {
      await this.prisma.project.update({
        where: { id: projectId },
        data: { status: 'failed' },
      });
      yield { type: 'error', content: `生成失败: ${err.message}` };
      return;
    }

    // 5. Update project with output
    await this.prisma.project.update({
      where: { id: projectId },
      data: { status: 'done', outputUrl: fullOutput },
    });

    yield { type: 'done', content: fullOutput };
  }
}
