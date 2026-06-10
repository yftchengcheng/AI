"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  Search,
  Plus,
  Lock,
  Eye,
  ArrowRight,
  FolderOpen,
} from "lucide-react";
import { api } from "@/lib/api";
import type { ApiProject, ToolType, ProjectStatus } from "@/types";

const typeConfig: Record<ToolType, { label: string; icon: React.ElementType; color: string }> = {
  app: { label: "App", icon: Smartphone, color: "bg-muted text-muted-foreground" },
  miniapp: { label: "小程序", icon: AppWindow, color: "bg-muted text-muted-foreground" },
  web: { label: "Web", icon: Globe, color: "bg-muted text-muted-foreground" },
  skill: { label: "Skill", icon: Puzzle, color: "bg-muted text-muted-foreground" },
  agent: { label: "Agent", icon: Bot, color: "bg-muted text-muted-foreground" },
};

const statusLabel: Record<ProjectStatus, string> = {
  draft: "草稿",
  building: "构建中",
  done: "已完成",
  failed: "失败",
};

const statusVariant: Record<ProjectStatus, "secondary" | "default" | "destructive"> = {
  draft: "secondary",
  building: "default",
  done: "default",
  failed: "destructive",
};

type FilterType = ToolType | "all";
type FilterStatus = ProjectStatus | "all";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    setLoading(true);
    api.getSafe<ApiProject[]>("/api/projects", [])
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search && !p.name.includes(search) && !p.description?.includes(search)) return false;
      return true;
    });
  }, [projects, search, typeFilter, statusFilter]);

  const relativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "刚刚";
    if (min < 60) return `${min} 分钟前`;
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `${hrs} 小时前`;
    return `${Math.floor(hrs / 24)} 天前`;
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">我的项目</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length > 0 ? `${projects.length} 个项目` : "管理你的所有 AI 工具项目"}
            </p>
          </div>
          <Button onClick={() => router.push("/builder/web")} size="sm" className="gap-1.5">
            <Plus size={14} /> 新建项目
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="搜索项目..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "app", "miniapp", "web", "skill", "agent"] as FilterType[]).map((t) => (
              <Button key={t} variant={typeFilter === t ? "default" : "outline"} size="sm" onClick={() => setTypeFilter(t)}>
                {t === "all" ? "全部" : typeConfig[t].label}
              </Button>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "draft", "building", "done", "failed"] as FilterStatus[]).map((s) => (
              <Button key={s} variant={statusFilter === s ? "secondary" : "ghost"} size="sm" onClick={() => setStatusFilter(s)}>
                {s === "all" ? "全部状态" : statusLabel[s]}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-36 rounded-lg" />)}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <Card className="py-16 text-center">
            <FolderOpen size={40} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              {projects.length === 0 ? "还没有项目，开始创建你的第一个 AI 工具" : "没有匹配的项目"}
            </p>
            <Button onClick={() => router.push("/builder/web")} variant="outline" size="sm" className="gap-1.5">
              <Plus size={14} /> 新建项目
            </Button>
          </Card>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const Icon = typeConfig[p.type].icon;
            const tc = typeConfig[p.type];
            return (
              <Card
                key={p.id}
                className="p-5 flex flex-col gap-3 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
                onClick={() => router.push(`/projects/${p.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tc.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {p.visibility === "private" ? (
                      <Lock size={12} className="text-muted-foreground" />
                    ) : (
                      <Eye size={12} className="text-muted-foreground" />
                    )}
                    <Badge variant={statusVariant[p.status]} className="text-xs">
                      {statusLabel[p.status]}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.description || "暂无描述"}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{tc.label}</span>
                  <span className="flex items-center gap-1">
                    {relativeTime(p.updatedAt)}
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
