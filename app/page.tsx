import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import type { ToolProject } from "@/types";

// ─── 示例数据 ───────────────────────────────────

const stats = [
  { title: "总项目数", value: 12, icon: Boxes, trend: { value: 8, label: "较上月" } },
  { title: "诊断次数", value: 48, icon: Stethoscope, trend: { value: 22, label: "较上月" } },
  { title: "活跃工具", value: 7, icon: Activity, trend: { value: 16, label: "较上月" } },
  { title: "下载量", value: "1,024", icon: Download, trend: { value: -3, label: "较上月" } },
];

const projects: ToolProject[] = [
  { id: "1", name: "电商小橙序", type: "miniapp", status: "done", description: "", config: {}, createdAt: new Date("2026-06-08"), updatedAt: new Date("2026-06-09") },
  { id: "2", name: "客服 Agent", type: "agent", status: "building", description: "", config: {}, createdAt: new Date("2026-06-07"), updatedAt: new Date("2026-06-08") },
  { id: "3", name: "库存管理 App", type: "app", status: "draft", description: "", config: {}, createdAt: new Date("2026-06-05"), updatedAt: new Date("2026-06-06") },
  { id: "4", name: "代码审查 Skill", type: "skill", status: "done", description: "", config: {}, createdAt: new Date("2026-06-04"), updatedAt: new Date("2026-06-05") },
  { id: "5", name: "营销落地页", type: "web", status: "failed", description: "", config: {}, createdAt: new Date("2026-06-03"), updatedAt: new Date("2026-06-04") },
];

const activities = [
  { id: "a1", action: "构建完成", project: "电商小橙序", time: "10 分钟前", icon: AppWindow },
  { id: "a2", action: "诊断通过", project: "客服 Agent", time: "1 小时前", icon: Stethoscope },
  { id: "a3", action: "新建项目", project: "库存管理 App", time: "3 小时前", icon: Smartphone },
  { id: "a4", action: "发布到市场", project: "代码审查 Skill", time: "昨天", icon: Puzzle },
  { id: "a5", action: "构建失败", project: "营销落地页", time: "2 天前", icon: Globe },
];

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
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ── 页头 ── */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">仪表盘</h1>
          <p className="text-sm text-muted-foreground mt-1">
            欢迎回来，查看你的 AI 工具平台概览
          </p>
        </div>

        {/* ── 统计卡片 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatsCard key={s.title} {...s} />
          ))}
        </div>

        {/* ── 快速创建 ── */}
        <Card className="p-5">
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
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors text-center"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${q.color}`}
                  >
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
            <ProjectList projects={projects} />
          </div>
          <div>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
