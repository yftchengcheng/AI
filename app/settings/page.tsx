"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Select as SelectUI,
  SelectContent as SelectContentUI,
  SelectItem as SelectItemUI,
  SelectTrigger as SelectTriggerUI,
  SelectValue as SelectValueUI,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { User, Bell, Shield, Palette, Globe, Key } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">设置</h1>
          <p className="text-sm text-muted-foreground mt-1">管理你的账户和应用偏好</p>
        </div>

        {/* ── Profile ── */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">个人信息</h2>
              <p className="text-xs text-muted-foreground">更新你的账户信息</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">用户名</Label>
              <Input id="name" defaultValue="tang" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" defaultValue="31614849@qq.com" />
            </div>
          </div>
          <Button size="sm">保存修改</Button>
        </Card>

        {/* ── Appearance ── */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10">
              <Palette size={18} className="text-violet-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">外观</h2>
              <p className="text-xs text-muted-foreground">自定义界面显示</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>主题模式</Label>
            <Select value={theme ?? "system"} onValueChange={(v) => { if (v) setTheme(v); }}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">浅色模式</SelectItem>
                <SelectItem value="dark">深色模式</SelectItem>
                <SelectItem value="system">跟随系统</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* ── Notifications ── */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
              <Bell size={18} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">通知</h2>
              <p className="text-xs text-muted-foreground">管理通知偏好</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">构建完成通知</p>
                <p className="text-xs text-muted-foreground">当项目构建完成时发送通知</p>
              </div>
              <Switch id="build-notify" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">市场更新</p>
                <p className="text-xs text-muted-foreground">工具市场有新工具上架时通知</p>
              </div>
              <Switch id="market-notify" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">诊断报告</p>
                <p className="text-xs text-muted-foreground">诊断分析完成后发送报告</p>
              </div>
              <Switch id="diag-notify" />
            </div>
          </div>
        </Card>

        {/* ── API Keys ── */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
              <Key size={18} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">API 密钥</h2>
              <p className="text-xs text-muted-foreground">管理 AI 模型 API 密钥</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="deepseek-key">DeepSeek API Key</Label>
              <Input id="deepseek-key" type="password" defaultValue="sk-••••••••••••••••" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">DeepSeek V4 Pro</Badge>
                <span className="text-xs text-muted-foreground">当前主力模型</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">已连接</span>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Danger Zone ── */}
        <Card className="p-6 space-y-4 border-destructive/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <Shield size={18} className="text-destructive" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">危险操作</h2>
              <p className="text-xs text-muted-foreground">不可逆的操作</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">删除所有项目和数据，此操作不可恢复</p>
            <Button variant="destructive" size="sm">删除所有数据</Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
