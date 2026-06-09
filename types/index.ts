// Core data types for the AI Tool Platform

export type ToolType = "app" | "miniapp" | "web" | "skill" | "agent";

export type ProjectStatus = "draft" | "building" | "done" | "failed";

export interface ToolProject {
  id: string;
  name: string;
  type: ToolType;
  status: ProjectStatus;
  description: string;
  config: Record<string, unknown>;
  outputUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface MarketplaceTool {
  id: string;
  name: string;
  description: string;
  category: ToolType;
  author: string;
  downloads: number;
  rating: number;
  tags: string[];
  icon: string;
  version: string;
}
