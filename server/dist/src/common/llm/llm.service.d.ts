export declare class LlmService {
    private client;
    constructor();
    getClient(): import("@ai-sdk/openai").OpenAIProvider;
    chat(messages: {
        role: "system" | "user" | "assistant";
        content: string;
    }[], options?: {
        maxTokens?: number;
        temperature?: number;
    }): Promise<string>;
    chatStream(messages: {
        role: "system" | "user" | "assistant";
        content: string;
    }[]): AsyncGenerator<string>;
}
