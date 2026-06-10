"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  Stethoscope,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  FolderOpen,
  Library,
  Workflow,
  BookOpen,
} from "lucide-react";

// ────────────── Navigation definitions ──────────────

const mainNav = [
  { href: "/", label: "仪表盘", icon: LayoutDashboard },
  { href: "/projects", label: "我的项目", icon: FolderOpen },
  { href: "/workflow", label: "工作流", icon: Workflow },
  { href: "/knowledge", label: "知识库", icon: BookOpen },
  { href: "/skills", label: "Skill 库", icon: Library },
  { href: "/diagnostics", label: "开发诊断", icon: Stethoscope },
  { href: "/marketplace", label: "工具市场", icon: Store },
];

const builderNav = [
  { href: "/builder/app", label: "App 构建器", icon: Smartphone },
  { href: "/builder/miniapp", label: "小程序构建器", icon: AppWindow },
  { href: "/builder/web", label: "Web 构建器", icon: Globe },
  { href: "/builder/skill", label: "Skill 编辑器", icon: Puzzle },
  { href: "/builder/agent", label: "Agent 构建器", icon: Bot },
];

const bottomNav = [{ href: "/settings", label: "设置", icon: Settings }];

// ────────────── Component ──────────────

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggle } = useSidebarStore();

  return (
    <TooltipProvider delay={300}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-200",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* ── Logo ── */}
        <div className="flex h-14 items-center justify-between px-3">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 font-semibold text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
                AI
              </div>
              <span className="truncate">工具平台</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", collapsed && "mx-auto")}
            onClick={toggle}
            aria-label={collapsed ? "展开侧栏" : "收起侧栏"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <Separator />

        {/* ── Quick Create ── */}
        <div className="px-3 pt-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger className="mx-auto flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Plus size={18} />
              </TooltipTrigger>
              <TooltipContent side="right">快速创建</TooltipContent>
            </Tooltip>
          ) : (
            <Button variant="default" className="w-full gap-2 h-9 text-sm" onClick={() => router.push("/builder/web")}>
              <Plus size={16} />
              创建新工具
            </Button>
          )}
        </div>

        {/* ── Navigation ── */}
        <ScrollArea className="flex-1 px-2 py-3">
          {/* Main nav */}
          <nav className="flex flex-col gap-0.5">
            {mainNav.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={pathname === item.href}
                collapsed={collapsed}
              />
            ))}
          </nav>

          <Separator className="my-3" />
          {!collapsed && (
            <p className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              构建器
            </p>
          )}

          {/* Builder nav */}
          <nav className="flex flex-col gap-0.5">
            {builderNav.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={pathname === item.href}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </ScrollArea>

        <Separator />

        {/* ── Bottom ── */}
        <div className="px-2 py-2">
          {bottomNav.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>
      </aside>
    </TooltipProvider>
  );
}

// ────────────── Nav Item ──────────────

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
}) {
  const link = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        collapsed && "justify-center px-0 py-2"
      )}
    >
      <Icon size={18} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>{link}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return link;
}
