import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type ToolProject } from "@/types";
import {
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  ToolProject["type"],
  { label: string; icon: React.ElementType; color: string }
> = {
  app: { label: "App", icon: Smartphone, color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
  miniapp: { label: "小程序", icon: AppWindow, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
  web: { label: "Web", icon: Globe, color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" },
  skill: { label: "Skill", icon: Puzzle, color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  agent: { label: "Agent", icon: Bot, color: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400" },
};

const statusLabel: Record<ToolProject["status"], string> = {
  draft: "草稿",
  building: "构建中",
  done: "已完成",
  failed: "失败",
};

export function ProjectList({ projects }: { projects: ToolProject[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">最近项目</h2>
        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          查看全部
        </Link>
      </div>
      {projects.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          还没有项目，点击"创建新工具"开始
        </div>
      ) : (
        <div className="divide-y divide-border">
          {projects.map((p) => {
            const Icon = typeConfig[p.type].icon;
            return (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/50 transition-colors"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    typeConfig[p.type].color
                  )}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {typeConfig[p.type].label}
                  </p>
                </div>
                <Badge
                  variant={
                    p.status === "done"
                      ? "default"
                      : p.status === "failed"
                        ? "destructive"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {statusLabel[p.status]}
                </Badge>
                <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto opacity-50">
                  <MoreHorizontal size={14} />
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}
