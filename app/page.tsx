"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Boxes, Activity, Puzzle, Download, Plus,
  Smartphone, AppWindow, Globe, Bot,
  ArrowRight, FolderOpen, Library, Store,
} from "lucide-react";
import { api } from "@/lib/api";
import type { ApiProject } from "@/types";

const quickActions = [
  { label: "App", desc: "React Native / Flutter", icon: Smartphone, href: "/builder/app" },
  { label: "小程序", desc: "微信小程序", icon: AppWindow, href: "/builder/miniapp" },
  { label: "Web 应用", desc: "Next.js / React", icon: Globe, href: "/builder/web" },
  { label: "Skill", desc: "自定义技能", icon: Puzzle, href: "/builder/skill" },
  { label: "Agent", desc: "AI 代理", icon: Bot, href: "/builder/agent" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ApiProject[]>("/api/projects")
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const doneCount = projects.filter(p => p.status === "done").length;
  const publicCount = projects.filter(p => p.visibility === "public").length;
  const buildCount = projects.filter(p => p.status === "building").length;

  const stats = [
    { title: "总项目数", value: projects.length, icon: Boxes, description: `${publicCount} 个已发布` },
    { title: "已完成", value: doneCount, icon: Activity, description: `${buildCount} 个构建中` },
    { title: "Skill 库", value: "41", icon: Puzzle, description: "内置 AI Skill" },
    { title: "活跃工具", value: publicCount || "—", icon: Download, description: "发布到市场的工具" },
  ];

  const activities = projects.slice(0, 5).map(p => ({
    id: p.id,
    action: p.status === "done" ? "构建完成" : p.status === "building" ? "构建中" : p.status === "failed" ? "构建失败" : "新建项目",
    project: p.name,
    time: new Date(p.updatedAt).toLocaleDateString("zh-CN"),
    icon: quickActions.find(q => q.href.includes(p.type))?.icon || Globe,
  }));

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">仪表盘</h1>
          <p className="text-sm text-muted-foreground mt-1">欢迎回来，查看你的 AI 工具平台概览</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => <StatsCard key={s.title} {...s} />)}
          </div>
        )}

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Plus size={16} />
            <h2 className="text-sm font-medium">快速创建</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map(q => {
              const Icon = q.icon;
              return (
                <a key={q.label} href={q.href}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border p-4 hover:bg-muted transition-colors text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium">{q.label}</span>
                  <span className="text-[11px] text-muted-foreground">{q.desc}</span>
                </a>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? <Skeleton className="h-64 rounded-lg" /> : <ProjectList projects={projects} />}
          </div>
          <div>
            {loading ? <Skeleton className="h-64 rounded-lg" /> : <ActivityFeed activities={activities} />}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "我的项目", sub: `${projects.length} 个项目`, icon: FolderOpen, href: "/projects" },
            { label: "Skill 库", sub: "41 个内置 Skill", icon: Library, href: "/skills" },
            { label: "工具市场", sub: "发现更多工具", icon: Store, href: "/marketplace" },
          ].map(item => {
            const Icon = item.icon;
            return (
              <Card key={item.href} className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => router.push(item.href)}>
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
