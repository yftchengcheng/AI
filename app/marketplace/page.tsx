"use client";

import { useState, useMemo, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
  Eye,
} from "lucide-react";
import { api } from "@/lib/api";
import type { ApiMarketplaceTool, ToolType } from "@/types";

const categories = [
  { value: "all" as const, label: "全部" },
  { value: "app" as const, label: "App", icon: Smartphone },
  { value: "miniapp" as const, label: "小程序", icon: AppWindow },
  { value: "web" as const, label: "Web", icon: Globe },
  { value: "skill" as const, label: "Skill", icon: Puzzle },
  { value: "agent" as const, label: "Agent", icon: Bot },
];

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  app: Smartphone, miniapp: AppWindow, web: Globe, skill: Puzzle, agent: Bot,
};

// ── Page ──────────────────────────────────────────────────────

export default function MarketplacePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<ApiMarketplaceTool | null>(null);
  const [tools, setTools] = useState<ApiMarketplaceTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (category !== "all") params.category = category;
    if (search) params.search = search;
    api.get<{ tools: ApiMarketplaceTool[]; total: number }>("/api/marketplace", params)
      .then(({ tools }) => setTools(tools))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, category]);

  const filtered = tools;

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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-40 rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tool) => (
            <Card
              key={tool.id}
              className="p-5 flex flex-col gap-3 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
              onClick={() => setSelected(tool)}
            >
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground">{React.createElement(icons[tool.category] as React.ComponentType<{ size?: number }> || Globe, { size: 20 })}</span>
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
        )}

        {filtered.length === 0 && !loading && (
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
                  <span className="text-2xl">{React.createElement(icons[selected.category] as React.ComponentType<{ size?: number }> || Globe, { size: 24 })}</span>
                  <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">分类：</span>
                  <span className="font-medium">{categories.find((c) => c.value === selected.category)?.label || selected.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  {(selected.tags || []).map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-medium">{selected.rating}</span>
                  </span>
                  <span className="text-muted-foreground">{selected.downloads.toLocaleString()} 次下载</span>
                </div>
                <Separator />
                {selected.projectId ? (
                  <Button className="w-full gap-1.5" onClick={() => { setSelected(null); router.push(`/projects/${selected.projectId}`); }}>
                    <Eye size={14} /> 查看项目详情
                  </Button>
                ) : (
                  <Button className="w-full gap-1.5">
                    <Download size={14} /> 安装/使用
                  </Button>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </MainLayout>
  );
}
