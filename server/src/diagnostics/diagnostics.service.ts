import { Injectable } from "@nestjs/common";
import { LlmService } from "../common/llm";

const DIAGNOSTIC_PROMPTS: Record<string, string> = {
  error: `你是一个编译器错误分析专家。分析以下构建报错日志，给出：
1. 根因分析
2. 修复步骤（具体到代码行）
3. 预防建议

请用中文回答。`,

  perf: `你是一个 Web 性能专家。分析以下性能审计结果，给出：
1. 问题严重等级
2. 各指标的优化建议
3. 优先级排序

请用中文回答。`,

  dependency: `你是一个依赖管理安全专家。检查以下依赖列表，识别：
1. 已知漏洞（CVE）
2. 版本过期的包
3. 升级路径和风险

请用中文回答。`,

  log: `你是一个运维日志分析专家。分析以下日志，识别：
1. 错误模式和频率
2. 根因推断
3. 修复或优化建议

请用中文回答。`,
};

@Injectable()
export class DiagnosticsService {
  constructor(private readonly llm: LlmService) {}

  async *analyze(type: string, input: string): AsyncGenerator<string> {
    const systemPrompt = DIAGNOSTIC_PROMPTS[type] ?? DIAGNOSTIC_PROMPTS.error;

    for await (const chunk of this.llm.chatStream([
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ])) {
      yield chunk;
    }
  }
}
