"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticStatus = exports.DiagnosticType = exports.MarketStatus = exports.ProjectStatus = exports.ToolType = exports.ProjectVisibility = void 0;
exports.ProjectVisibility = {
    private: 'private',
    public: 'public'
};
exports.ToolType = {
    app: 'app',
    miniapp: 'miniapp',
    web: 'web',
    skill: 'skill',
    agent: 'agent'
};
exports.ProjectStatus = {
    draft: 'draft',
    building: 'building',
    done: 'done',
    failed: 'failed'
};
exports.MarketStatus = {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected'
};
exports.DiagnosticType = {
    error: 'error',
    perf: 'perf',
    dependency: 'dependency',
    log: 'log'
};
exports.DiagnosticStatus = {
    pending: 'pending',
    analyzing: 'analyzing',
    done: 'done',
    failed: 'failed'
};
//# sourceMappingURL=enums.js.map