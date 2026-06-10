export declare const ProjectVisibility: {
    readonly private: "private";
    readonly public: "public";
};
export type ProjectVisibility = (typeof ProjectVisibility)[keyof typeof ProjectVisibility];
export declare const ToolType: {
    readonly app: "app";
    readonly miniapp: "miniapp";
    readonly web: "web";
    readonly skill: "skill";
    readonly agent: "agent";
};
export type ToolType = (typeof ToolType)[keyof typeof ToolType];
export declare const ProjectStatus: {
    readonly draft: "draft";
    readonly building: "building";
    readonly done: "done";
    readonly failed: "failed";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export declare const MarketStatus: {
    readonly pending: "pending";
    readonly approved: "approved";
    readonly rejected: "rejected";
};
export type MarketStatus = (typeof MarketStatus)[keyof typeof MarketStatus];
export declare const DiagnosticType: {
    readonly error: "error";
    readonly perf: "perf";
    readonly dependency: "dependency";
    readonly log: "log";
};
export type DiagnosticType = (typeof DiagnosticType)[keyof typeof DiagnosticType];
export declare const DiagnosticStatus: {
    readonly pending: "pending";
    readonly analyzing: "analyzing";
    readonly done: "done";
    readonly failed: "failed";
};
export type DiagnosticStatus = (typeof DiagnosticStatus)[keyof typeof DiagnosticStatus];
