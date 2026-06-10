"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  ArrowLeft,
  Eye,
  Lock,
  Rocket,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
} from "lucide-react";
import { api } from "@/lib/api";
import type { ApiProject, ToolType, ProjectStatus } from "@/types";

const typeConfig: Record<ToolType, { label: string; icon: React.ElementType }> = {
  app: { label: "App", icon: Smartphone },
  miniapp: { label: "小程序", icon: AppWindow },
  web: { label: "Web", icon: Globe },
  skill: { label: "Skill", icon: Puzzle },
  agent: { label: "Agent", icon: Bot },
};

const statusLabel: Record<ProjectStatus, string> = {
  draft: "草稿",
  building: "构建中",
  done: "已完成",
  failed: "失败",
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [buildLog, setBuildLog] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getSafe<ApiProject | null>(`/api/projects/${id}`, null)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Auto-scroll build log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [buildLog]);

  const handleBuild = useCallback(() => {
    setBuilding(true);
    setBuildLog(["🚀 正在启动 DeepSeek V4 Pro 构建引擎..."]);
    // Simulate build with stream from API
    const eventSource = api.stream("/api/diagnostics/analyze", {
      type: "log",
      input: `Build project: ${project?.name} (type: ${project?.type})`,
    });
    (async () => {
      let current = "";
      try {
        for await (const chunk of eventSource) {
          current += chunk;
          // Split into lines for the log
          setBuildLog((prev) => {
            const lines = (current).split("\n").filter(Boolean);
            return ["🚀 正在调用 DeepSeek V4 Pro...", ...lines.slice(-20)];
          });
        }
        setBuildLog((prev) => [...prev, "✅ 构建完成！代码已生成。"]);
        // Refresh project status
        api.getSafe<ApiProject | null>(`/api/projects/${id}`, null).then(setProject);
      } catch (err: any) {
        setBuildLog((prev) => [...prev, `❌ 构建失败: ${err.message}`]);
      } finally {
        setBuilding(false);
      }
    })();
  }, [id, project]);

  const handlePublish = async () => {
    try {
      await api.post(`/api/projects/${id}/publish`);
      setProject((prev) => prev ? { ...prev, visibility: "public" } : prev);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("确定要删除这个项目？此操作不可恢复。")) return;
    setDeleting(true);
    try {
      await api.del(`/api/projects/${id}`);
      router.push("/projects");
    } catch (err: any) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </MainLayout>
    );
  }

  if (error || !project) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-16 text-center">
          <XCircle size={40} className="mx-auto text-destructive/40 mb-4" />
          <p className="text-sm text-muted-foreground">{error || "项目未找到"}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/projects")}>
            <ArrowLeft size={14} className="mr-1.5" /> 返回项目列表
          </Button>
        </div>
      </MainLayout>
    );
  }

  const Icon = typeConfig[project.type].icon;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back + Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push("/projects")}>
            <ArrowLeft size={14} className="mr-1.5" /> 返回项目列表
          </Button>
          <div className="flex items-center gap-2">
            {building ? (
              <Button disabled size="sm"><Loader2 size={14} className="mr-1.5 animate-spin" /> 构建中...</Button>
            ) : (
              <Button size="sm" onClick={handleBuild} className="gap-1.5">
                <Rocket size={14} /> 触发构建
              </Button>
            )}
            {project.visibility !== "public" && (
              <Button size="sm" variant="outline" onClick={handlePublish} className="gap-1.5">
                <Eye size={14} /> 发布到市场
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={handleDelete} disabled={deleting} className="text-destructive gap-1.5">
              <Trash2 size={14} /> 删除
            </Button>
          </div>
        </div>

        {/* Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{project.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{typeConfig[project.type].label}</Badge>
                <Badge variant={project.status === "done" ? "default" : project.status === "failed" ? "destructive" : "secondary"}>
                  {statusLabel[project.status]}
                </Badge>
                {project.visibility === "public" ? (
                  <Badge variant="default" className="gap-1"><Eye size={10} /> 已发布</Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1"><Lock size={10} /> 私有</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Config */}
          <Card className="p-5">
            <h2 className="text-sm font-semibold mb-3">项目配置</h2>
            <pre className="text-xs font-mono bg-muted rounded-lg p-4 max-h-64 overflow-auto whitespace-pre-wrap">
              {JSON.stringify(project.config, null, 2)}
            </pre>
            <div className="mt-3 text-xs text-muted-foreground space-y-1">
              <p>创建时间: {new Date(project.createdAt).toLocaleString("zh-CN")}</p>
              <p>更新时间: {new Date(project.updatedAt).toLocaleString("zh-CN")}</p>
            </div>
          </Card>

          {/* Build Output */}
          <Card className="p-5">
            <h2 className="text-sm font-semibold mb-3">构建输出</h2>
            <div
              ref={logRef}
              className="text-xs font-mono bg-muted rounded-lg p-4 h-64 overflow-auto space-y-1"
            >
              {buildLog.length === 0 && !building && (
                <span className="text-muted-foreground">点击「触发构建」开始生成代码...</span>
              )}
              {buildLog.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-all">{line}</div>
              ))}
              {building && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 size={12} className="animate-spin" /> 构建中...
                </div>
              )}
            </div>
            {project.outputUrl && (
              <div className="mt-3 text-xs">
                <span className="text-muted-foreground">产物链接: </span>
                <code className="text-primary">{project.outputUrl}</code>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
