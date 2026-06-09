"use client";

import { useSidebarStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Search, Bell } from "lucide-react";

export function Header() {
  const { collapsed } = useSidebarStore();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-4 transition-[margin]"
      style={{ marginLeft: collapsed ? "4rem" : "15rem" }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          placeholder="搜索项目、工具..."
          className="w-full rounded-md border border-border bg-muted/50 pl-9 pr-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-muted"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="通知">
          <Bell size={18} />
        </Button>

        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="切换主题">
              <Sun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun size={14} className="mr-2" /> 浅色
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon size={14} className="mr-2" /> 深色
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor size={14} className="mr-2" /> 跟随系统
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full ml-1">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  T
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>个人中心</DropdownMenuItem>
            <DropdownMenuItem>我的项目</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
