"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Download,
  Star,
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  CheckCircle2,
} from "lucide-react";
import type { MarketplaceTool } from "@/types";

// ── Mock data ──────────────────────────────────────────────────

const mockTools: MarketplaceTool[] = [
  { id: "1", name: "电商小程序模板", description: "完整的电商微信小程序，包含商品列表、购物车、订单管理", category: "miniapp", author: "官方", downloads: 2340, rating: 4.8, tags: ["电商", "微信", "Taro"], icon: "🛒", version: "2.1.0" },
  { id: "2", name: "代码审查 Skill", description: "自动审查 PR 代码质量、安全漏洞和最佳实践", category: "skill", author: "社区", downloads: 1890, rating: 4.6, tags: ["GitHub", "代码质量", "安全"], icon: "🔍", version: "1.3.2" },
  { id: "3", name: "客服 Agent", description: "基于知识库的智能客服 Agent，支持多渠道接入", category: "agent", author: "官方", downloads: 1560, rating: 4.9, tags: ["客服", "NLP", "多语言"], icon: "🤖", version: "3.0.0" },
  { id: "4", name: "企业官网 Web 模板", description: "响应式企业官网，Next.js + Tailwind，SEO 优化", category: "web", author: "官方", downloads: 980, rating: 4.5, tags: ["官网", "SEO", "响应式"], icon: "🌐", version: "1.0.1" },
  { id: "5", name: "健身追踪 App", description: "React Native 健身应用，运动记录和数据分析", category: "app", author: "社区", downloads: 720, rating: 4.3, tags: ["健身", "React Native", "图表"], icon: "📱", version: "1.2.0" },
  { id: "6", name: "日志分析 Skill", description: "自动分析服务器日志，识别错误模式和趋势", category: "skill", author: "社区", downloads: 650, rating: 4.4, tags: ["日志", "分析", "监控"], icon: "📊", version: "0.9.5" },
  { id: "7", name: "项目管理 App", description: "Flutter 全栈项目管理工具，支持甘特图和看板", category: "app", author: "社区", downloads: 540, rating: 4.7, tags: ["项目管理", "Flutter"], icon: "📋", version: "2.0.0" },
  { id: "8", name: "数据看板 Web", description: "实时数据可视化看板，ECharts + React", category: "web", author: "官方", downloads: 430, rating: 4.2, tags: ["可视化", "实时", "ECharts"], icon: "📈", version: "1.0.0" },
];

const categories = [
  { value: "all" as const, label: "全部" },
  { value: "app" as const, label: "App", icon: Smartphone },
  { value: "miniapp" as const, label: "小程序", icon: AppWindow },
  { value: "web" as const, label: "Web", icon: Globe },
  { value: "skill" as const, label: "Skill", icon: Puzzle },
  { value: "agent" as const, label: "Agent", icon: Bot },
];

// ── Page ──────────────────────────────────────────────────────

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<MarketplaceTool | null>(null);

  const filtered = useMemo(() => {
    return mockTools.filter((t) => {
      const matchCat = category === "all" || t.category === category;
      const matchSearch =
        !search ||
        t.name.includes(search) ||
        t.description.includes(search) ||
        t.tags.some((tag) => tag.includes(search));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">工具市场</h1>
          <p className="text-sm text-muted-foreground mt-1">浏览和发现 AI 工具，一键安装使用</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索工具..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Button
                  key={c.value}
                  variant={category === c.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(c.value)}
                  className="gap-1.5"
                >
                  {Icon && <Icon size={14} />}
                  {c.label}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool) => (
            <Card
              key={tool.id}
              className="p-5 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => setSelected(tool)}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{tool.icon}</span>
                <Badge variant="secondary" className="text-xs">
                  {categories.find((c) => c.value === tool.category)?.label}
                </Badge>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  {tool.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Download size={12} />
                  {tool.downloads.toLocaleString()}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            没有找到匹配的工具
          </div>
        )}

        {/* Detail Dialog */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          {selected && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selected.icon}</span>
                  <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">作者：</span>
                  <span className="font-medium">{selected.author}</span>
                  {selected.author === "官方" && (
                    <CheckCircle2 size={14} className="text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selected.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-medium">{selected.rating}</span>
                  </span>
                  <span className="text-muted-foreground">v{selected.version}</span>
                  <span className="text-muted-foreground">{selected.downloads.toLocaleString()} 次下载</span>
                </div>
                <Separator />
                <Button className="w-full gap-2">
                  <Download size={14} /> 安装工具
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </MainLayout>
  );
}
