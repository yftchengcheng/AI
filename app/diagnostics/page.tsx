"use client";

import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bug,
  Gauge,
  Package,
  FileText,
  Send,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

// ── Mock diagnostic results ───────────────────────────────────

function ErrorAnalyzer() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { summary: string; fixes: string[] }>(null);

  const analyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        summary: "检测到 TypeScript 类型错误：`Property 'name' does not exist on type '{}'`",
        fixes: [
          "添加接口定义：`interface Props { name: string }`",
          "在组件参数中声明类型：`function Comp({ name }: Props)`",
          "如果参数来自 API，使用 `as` 类型断言或 Zod 校验",
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">粘贴你的构建报错日志，AI 将分析并提供修复建议</p>
      <Textarea
        placeholder={`Module not found: Can't resolve 'lodash'\n\nType error: Property 'user' does not exist...`}
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="font-mono text-xs"
      />
      <Button onClick={analyze} disabled={loading || !input.trim()}>
        {loading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Send size={14} className="mr-1.5" />}
        分析错误
      </Button>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}

      {result && (
        <Card className="p-4 space-y-3 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span className="text-sm font-medium">{result.summary}</span>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">修复建议：</p>
            {result.fixes.map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5 shrink-0">{i + 1}</Badge>
                <code className="text-xs bg-background rounded px-2 py-1 flex-1">{f}</code>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function PerfAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { score: number; items: { label: string; value: string; status: "good" | "warn" | "bad" }[] }>(null);

  const audit = () => {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        score: 78,
        items: [
          { label: "LCP (Largest Contentful Paint)", value: "2.8s", status: "warn" },
          { label: "FID (First Input Delay)", value: "45ms", status: "good" },
          { label: "CLS (Cumulative Layout Shift)", value: "0.12", status: "warn" },
          { label: "TTFB (Time to First Byte)", value: "180ms", status: "good" },
          { label: "未压缩资源", value: "3 个文件 (总计 1.2MB)", status: "bad" },
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">输入 URL 进行性能审计（需后端 Playwright 支持）</p>
      <div className="flex gap-2">
        <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1" />
        <Button onClick={audit} disabled={loading || !url.trim()}>
          {loading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Gauge size={14} className="mr-1.5" />}
          审计
        </Button>
      </div>

      {loading && <div className="space-y-3"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div>}

      {result && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">性能评分</span>
            <Badge variant={result.score >= 90 ? "default" : result.score >= 50 ? "secondary" : "destructive"} className="text-lg px-3 py-1">
              {result.score}/100
            </Badge>
          </div>
          {result.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-t border-border pt-3 first:border-0 first:pt-0">
              <span className="text-sm">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{item.value}</span>
                {item.status === "good" && <CheckCircle2 size={14} className="text-emerald-500" />}
                {item.status === "warn" && <AlertTriangle size={14} className="text-amber-500" />}
                {item.status === "bad" && <AlertTriangle size={14} className="text-red-500" />}
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function DepChecker() {
  const [deps, setDeps] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { summary: string; issues: { name: string; current: string; latest: string; severity: string }[] }>(null);

  const check = () => {
    if (!deps.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        summary: "扫描 42 个依赖，发现 2 个已知漏洞",
        issues: [
          { name: "axios", current: "1.6.2", latest: "1.7.9", severity: "中危" },
          { name: "webpack-dev-server", current: "4.15.1", latest: "5.0.4", severity: "高危" },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">粘贴 package.json 的 dependencies 部分或直接上传文件</p>
      <Textarea
        placeholder='{\n  "axios": "^1.6.2",\n  "lodash": "^4.17.21",\n  "webpack-dev-server": "^4.15.1"\n}'
        rows={6}
        value={deps}
        onChange={(e) => setDeps(e.target.value)}
        className="font-mono text-xs"
      />
      <Button onClick={check} disabled={loading || !deps.trim()}>
        {loading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Package size={14} className="mr-1.5" />}
        扫描依赖
      </Button>

      {loading && <div className="space-y-3"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>}

      {result && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <span className="text-sm font-medium">{result.summary}</span>
          </div>
          {result.issues.map((issue, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <span className="font-mono text-sm font-medium">{issue.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{issue.current} → {issue.latest}</span>
              </div>
              <Badge variant={issue.severity === "高危" ? "destructive" : "secondary"}>{issue.severity}</Badge>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function LogViewer() {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | string>(null);

  const analyze = () => {
    if (!logs.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult("日志分析：检测到 3 次 500 错误，均发生在 `/api/users` 端点。根因：数据库连接池耗尽（max_connections=20 已用满）。建议：增加连接池大小或启用连接复用。");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">粘贴服务器或应用日志进行语义分析</p>
      <Textarea
        placeholder={`[ERROR] 2026-06-09 10:23:45 GET /api/users - 500\n[ERROR] 2026-06-09 10:23:46 GET /api/users - 500\n[WARN] DB pool exhausted...`}
        rows={8}
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        className="font-mono text-xs"
      />
      <Button onClick={analyze} disabled={loading || !logs.trim()}>
        {loading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <FileText size={14} className="mr-1.5" />}
        解读日志
      </Button>

      {loading && <Skeleton className="h-20 w-full" />}

      {result && (
        <Card className="p-4 border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm whitespace-pre-wrap leading-relaxed">{result}</div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function DiagnosticsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">开发诊断</h1>
          <p className="text-sm text-muted-foreground mt-1">AI 驱动的代码诊断、性能审计和日志分析</p>
        </div>

        <Tabs defaultValue="error" className="w-full">
          <TabsList className="w-full justify-start rounded-lg border border-border bg-muted/50 p-1">
            <TabsTrigger value="error" className="gap-1.5">
              <Bug size={14} /> 报错分析
            </TabsTrigger>
            <TabsTrigger value="perf" className="gap-1.5">
              <Gauge size={14} /> 性能审计
            </TabsTrigger>
            <TabsTrigger value="dep" className="gap-1.5">
              <Package size={14} /> 依赖检查
            </TabsTrigger>
            <TabsTrigger value="log" className="gap-1.5">
              <FileText size={14} /> 日志解读
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="error"><ErrorAnalyzer /></TabsContent>
            <TabsContent value="perf"><PerfAudit /></TabsContent>
            <TabsContent value="dep"><DepChecker /></TabsContent>
            <TabsContent value="log"><LogViewer /></TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
}
