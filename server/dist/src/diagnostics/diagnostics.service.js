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
exports.DiagnosticsService = void 0;
const common_1 = require("@nestjs/common");
const llm_1 = require("../common/llm");
const DIAGNOSTIC_PROMPTS = {
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
let DiagnosticsService = class DiagnosticsService {
    llm;
    constructor(llm) {
        this.llm = llm;
    }
    async *analyze(type, input) {
        const systemPrompt = DIAGNOSTIC_PROMPTS[type] ?? DIAGNOSTIC_PROMPTS.error;
        for await (const chunk of this.llm.chatStream([
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
        ])) {
            yield chunk;
        }
    }
};
exports.DiagnosticsService = DiagnosticsService;
exports.DiagnosticsService = DiagnosticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [llm_1.LlmService])
], DiagnosticsService);
//# sourceMappingURL=diagnostics.service.js.map