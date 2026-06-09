import { LlmService } from "../common/llm";
export declare class DiagnosticsService {
    private readonly llm;
    constructor(llm: LlmService);
    analyze(type: string, input: string): AsyncGenerator<string>;
}
