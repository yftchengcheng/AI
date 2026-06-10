// Core data types for the AI Tool Platform

export type ToolType = "app" | "miniapp" | "web" | "skill" | "agent";

export type ProjectStatus = "draft" | "building" | "done" | "failed";

export type ProjectVisibility = "private" | "public";

/** Raw project shape as returned from NestJS /api/projects */
export interface ApiProject {
  id: string;
  userId?: string;
  name: string;
  type: ToolType;
  status: ProjectStatus;
  description: string;
  config: Record<string, unknown>;
  visibility: ProjectVisibility;
  outputUrl: string | null;
  createdAt: string;
  updatedAt: string;
  // optional navigation
  marketplaceTool?: ApiMarketplaceTool | null;
}

// Backward-compatible alias
export type ToolProject = ApiProject;

export type DiagnosticType = "error" | "perf" | "dependency" | "log";

export type DiagnosticStatus = "pending" | "analyzing" | "done" | "failed";

export interface DiagnosticReport {
  id: string;
  type: DiagnosticType;
  input: string;
  result: Record<string, unknown> | null;
  status: DiagnosticStatus;
  createdAt: Date;
}

/** Marketplace tool as returned from NestJS /api/marketplace */
export interface ApiMarketplaceTool {
  id: string;
  projectId?: string;
  userId?: string;
  name: string;
  description: string;
  category: ToolType;
  author?: string;
  downloads: number;
  rating: number;
  tags: string[];
  version?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}

// Backward-compatible alias
export type MarketplaceTool = ApiMarketplaceTool;

export interface PaginatedResponse<T> {
  tools: T[];
  total: number;
}

// ---- Skills Library ----

export interface SkillEntry {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  tags: string[];
  mcpCompatible: boolean;
  trigger: string;
}
