"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Boxes,
  Activity,
  Stethoscope,
  Download,
  Plus,
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  ArrowRight,
  FolderOpen,
  Library,
  Store,
} from "lucide-react";
import { api } from "@/lib/api";
import type { ApiProject } from "@/types";

// ─── 快速创建 ───────────────────────────────────

const quickActions = [
  { label: "App", desc: "React Native / Flutter", icon: Smartphone, href: "/builder/app", color: "bg-blue-500/10 text-blue-600" },
  { label: "小程序", desc: "微信小程序", icon: AppWindow, href: "/builder/miniapp", color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Web 应用", desc: "Next.js / React", icon: Globe, href: "/builder/web", color: "bg-violet-500/10 text-violet-600" },
  { label: "Skill", desc: "自定义技能", icon: Puzzle, href: "/builder/skill", color: "bg-amber-500/10 text-amber-600" },
  { label: "Agent", desc: "AI 代理", icon: Bot, href: "/builder/agent", color: "bg-rose-500/10 text-rose-600" },
];

// ─── 页面 ───────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ApiProject[]>("/api/projects")
      .then((data) => {
        setProjects(data);
      })
      .catch(() => {
        // Fallback to empty state
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute stats from real data
  const doneCount = projects.filter((p) => p.status === "done").length;
  const publicCount = projects.filter((p) => p.visibility === "public").length;
  const buildCount = projects.filter((p) => p.status === "building").length;

  const stats = [
    { title: "总项目数", value: projects.length, icon: Boxes, description: `${publicCount} 个已发布` },
    { title: "已完成", value: doneCount, icon: Activity, description: `${buildCount} 个构建中` },
    { title: "Skill 库", value: "41", icon: Puzzle, description: "内置 AI Skill" },
    { title: "活跃工具", value: publicCount || "—", icon: Download, description: "发布到市场的工具" },
  ];

  // Derive activities from project data
  const activities = projects.slice(0, 5).map((p, i) => ({
    id: p.id,
    action: p.status === "done" ? "构建完成" : p.status === "building" ? "构建中" : p.status === "failed" ? "构建失败" : "新建项目",
    project: p.name,
    time: new Date(p.updatedAt).toLocaleDateString("zh-CN"),
    icon: quickActions.find((q) => q.href.includes(p.type))?.icon || Globe,
  }));

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ── 页头 ── */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">仪表盘</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            欢迎回来，查看你的 AI 工具平台概览
          </p>
        </div>

        {/* ── 统计卡片 ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatsCard key={s.title} {...s} />
            ))}
          </div>
        )}

        {/* ── 快速创建 ── */}
        <Card className="p-5 bg-gradient-to-br from-card to-muted/30">
          <div className="flex items-center gap-2 mb-4">
            <Plus size={16} className="text-primary" />
            <h2 className="text-sm font-semibold">快速创建</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map((q) => {
              const Icon = q.icon;
              return (
                <a
                  key={q.label}
                  href={q.href}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border p-4 hover:bg-muted/50 hover:border-primary/20 transition-all text-center"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${q.color} transition-transform group-hover:scale-110`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium">{q.label}</span>
                  <span className="text-[11px] text-muted-foreground">{q.desc}</span>
                </a>
              );
            })}
          </div>
        </Card>

        {/* ── 项目列表 + 活动 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <ProjectList projects={projects} />
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton className="h-64 rounded-lg" />
            ) : (
              <ActivityFeed activities={activities} />
            )}
          </div>
        </div>

        {/* ── Quick links ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center justify-between hover:shadow-md hover:border-primary/20 transition-all cursor-pointer" onClick={() => router.push("/projects")}>
            <div className="flex items-center gap-3">
              <FolderOpen size={18} className="text-primary" />
              <div>
                <p className="text-sm font-medium">我的项目</p>
                <p className="text-xs text-muted-foreground">{projects.length} 个项目</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-muted-foreground" />
          </Card>
          <Card className="p-4 flex items-center justify-between hover:shadow-md hover:border-primary/20 transition-all cursor-pointer" onClick={() => router.push("/skills")}>
            <div className="flex items-center gap-3">
              <Library size={18} className="text-primary" />
              <div>
                <p className="text-sm font-medium">Skill 库</p>
                <p className="text-xs text-muted-foreground">41 个内置 Skill</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-muted-foreground" />
          </Card>
          <Card className="p-4 flex items-center justify-between hover:shadow-md hover:border-primary/20 transition-all cursor-pointer" onClick={() => router.push("/marketplace")}>
            <div className="flex items-center gap-3">
              <Store size={18} className="text-primary" />
              <div>
                <p className="text-sm font-medium">工具市场</p>
                <p className="text-xs text-muted-foreground">发现更多工具</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-muted-foreground" />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
