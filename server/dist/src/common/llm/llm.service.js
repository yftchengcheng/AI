"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("@ai-sdk/openai");
let LlmService = class LlmService {
    client;
    constructor() {
        const apiKey = process.env.DEEPSEEK_API_KEY || "sk-placeholder";
        const baseURL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
        this.client = (0, openai_1.createOpenAI)({
            apiKey,
            baseURL,
        });
    }
    getClient() {
        return this.client;
    }
    async chat(messages, options) {
        const model = this.client("deepseek-chat");
        const { generateText } = await import("ai");
        const result = await generateText({
            model,
            messages,
            maxOutputTokens: options?.maxTokens ?? 4096,
            temperature: options?.temperature ?? 0.7,
        });
        return result.text;
    }
    async *chatStream(messages) {
        const model = this.client("deepseek-chat");
        const { streamText } = await import("ai");
        const { textStream } = streamText({
            model,
            messages,
        });
        for await (const chunk of textStream) {
            yield chunk;
        }
    }
};
exports.LlmService = LlmService;
exports.LlmService = LlmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LlmService);
//# sourceMappingURL=llm.service.js.map