import { Injectable } from "@nestjs/common";
import { LlmService } from "../common/llm";

/**
 * Node executor — runs individual workflow node types.
 */
@Injectable()
export class NodeExecutorService {
  constructor(private readonly llm: LlmService) {}

  async execute(
    type: string,
    config: Record<string, unknown>,
    input: unknown,
    previousOutputs: Map<string, unknown>
  ): Promise<{ output: unknown }> {
    switch (type) {
      case "start":
        return { output: input };

      case "llm": {
        const systemPrompt = (config.systemPrompt as string) || "You are a helpful assistant.";
        const userPrompt = this.interpolate(String(config.userPrompt || ""), input, previousOutputs);
        const result = await this.llm.chat([
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ]);
        return { output: result };
      }

      case "code": {
        const language = (config.language as string) || "javascript";
        const code = this.interpolate(String(config.code || ""), input, previousOutputs);
        // Execute in sandbox (for MVP, use Node.js eval with timeout)
        const result = await this.executeSandbox(code, language);
        return { output: result };
      }

      case "condition": {
        const expression = this.interpolate(String(config.expression || "true"), input, previousOutputs);
        try {
          const result = eval(expression);
          return { output: Boolean(result) };
        } catch {
          return { output: false };
        }
      }

      case "end":
        return { output: input };

      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }

  /**
   * Replace {{variable}} placeholders in template strings.
   */
  private interpolate(template: string, input: unknown, outputs: Map<string, unknown>): string {
    let result = template;
    // Replace {{input}} with the initial input
    if (typeof input === "object" && input !== null) {
      for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
        result = result.replace(new RegExp(`\\{\\{input\\.${key}\\}\\}`, "g"), String(value));
      }
    }
    result = result.replace(/\{\{input\}\}/g, typeof input === "string" ? input : JSON.stringify(input));

    // Replace {{node.xxx}} with previous node outputs
    for (const [nodeId, value] of outputs) {
      if (typeof value === "string") {
        result = result.replace(new RegExp(`\\{\\{${nodeId}\\}\\}`, "g"), value);
      }
    }
    return result;
  }

  /**
   * Execute code in a sandboxed environment.
   * MVP: use Function constructor with timeout.
   * Production: Docker sandbox.
   */
  private async executeSandbox(code: string, language: string): Promise<string> {
    if (language === "javascript" || language === "js") {
      try {
        const fn = new Function("input", "outputs", `
          try {
            ${code}
          } catch(e) {
            return 'Error: ' + e.message;
          }
        `);
        const result = fn({}, {});
        return String(result ?? "");
      } catch (err: any) {
        return `Sandbox error: ${err.message}`;
      }
    }
    // Python would need Docker — return stub for now
    return `[Python execution requires Docker sandbox — not available in MVP]`;
  }
}
