"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  ArrowUpRight,
  Pencil,
} from "lucide-react";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/skills-data";
import type { SkillEntry } from "@/types";

// Simple lucide icon name → emoji fallback
const iconMap: Record<string, string> = {
  Image: "🖼️", Video: "🎬", Film: "🎞️", PenLine: "✍️", Palette: "🎨",
  Sparkles: "✨", ShieldAlert: "🛡️", MessageCircle: "💬", Radio: "📡",
  Mail: "📧", Images: "🖼️", Rocket: "🚀", SearchCode: "🔍", Briefcase: "💼",
  Calculator: "🧮", UserPlus: "👤", Users: "👥", Plug: "🔌", Tag: "🏷️",
  Server: "🖥️", TestTube: "🧪", Bug: "🐛", Building: "🏗️", Database: "🗄️",
  CheckSquare: "✅", FileText: "📄", Presentation: "📊", Table: "📋",
  File: "📁", ScrollText: "📜", Layout: "🎯", PaintBucket: "🎨",
  Award: "🏆", Component: "🧩", ClipboardList: "📝", ListTodo: "✅",
  FileEdit: "📝", Target: "🎯", Eye: "👁️",
};

function SkillIcon({ name }: { name: string }) {
  return <span className="text-xl">{iconMap[name] || "🔧"}</span>;
}

export default function SkillsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [selected, setSelected] = useState<SkillEntry | null>(null);

  const filtered = useMemo(() => {
    return SKILLS.filter((s) => {
      if (category !== "全部" && s.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        return s.title.includes(q) || s.description.includes(q) || s.tags.some((t) => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [search, category]);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Skill 库</h1>
          <p className="text-sm text-muted-foreground mt-1">
            浏览 {SKILLS.length} 个内置 AI Skill，覆盖内容创作、自动化集成、开发工具等领域
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="搜索 Skill..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {SKILL_CATEGORIES.map((c) => (
              <Button
                key={c.key}
                variant={category === c.key ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c.key)}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill) => (
            <Card
              key={skill.id}
              className="p-4 flex flex-col gap-3 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
              onClick={() => setSelected(skill)}
            >
              <div className="flex items-start justify-between">
                <SkillIcon name={skill.icon} />
                {skill.mcpCompatible && <Badge variant="secondary" className="text-[10px]">MCP</Badge>}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{skill.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{skill.description}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {skill.tags.slice(0, 3).map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            没有找到匹配的 Skill
          </div>
        )}

        {/* Detail Dialog */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          {selected && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <SkillIcon name={selected.icon} />
                  <DialogTitle className="text-lg">{selected.title}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{selected.description}</p>
                <div className="flex flex-wrap gap-1">
                  {selected.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-medium">触发词：</span>{selected.trigger}</p>
                  <p><span className="font-medium">MCP 兼容：</span>{selected.mcpCompatible ? "✅ 是" : "❌ 否"}</p>
                </div>
                <Separator />
                <Button
                  className="w-full gap-1.5"
                  onClick={() => {
                    setSelected(null);
                    router.push("/builder/skill");
                  }}
                >
                  <Pencil size={14} /> 在 Skill 编辑器中使用
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </MainLayout>
  );
}
