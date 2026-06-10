"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { BuilderLayout } from "@/components/builder/builder-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Smartphone,
  AppWindow,
  Globe,
  Puzzle,
  Bot,
  Check,
  CheckCircle2,
  Eye,
  FolderOpen,
  Plus,
  Loader2,
} from "lucide-react";
import { Switch as SwitchUI } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import type { ApiProject } from "@/types";

// ── Types ──────────────────────────────────────────────────

type BuilderId = "app" | "miniapp" | "web" | "skill" | "agent";
type BuilderConfig = Record<string, unknown>;

interface BuilderStepProps {
  config: BuilderConfig;
  setConfig: (c: BuilderConfig) => void;
}

// ── Step renderers (one per step) ────────────────────────────

function AppStep0({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">App 名称</Label>
        <Input id="name" placeholder="例如：电商助手" value={String(config.name || "")} onChange={(e) => setConfig({ ...config, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">App 描述</Label>
        <Textarea id="desc" placeholder="描述你的 App 功能和用途..." rows={4} value={String(String(config.description || ""))} onChange={(e) => setConfig({ ...config, description: e.target.value })} />
      </div>
    </div>
  );
}

function AppStep1({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>开发框架</Label>
        <Select value={config.framework || "react-native"} onValueChange={(v) => setConfig({ ...config, framework: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="react-native">React Native</SelectItem>
            <SelectItem value="flutter">Flutter</SelectItem>
            <SelectItem value="expo">Expo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>目标平台</Label>
        <Select value={config.platform || "both"} onValueChange={(v) => setConfig({ ...config, platform: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="both">iOS + Android</SelectItem>
            <SelectItem value="ios">仅 iOS</SelectItem>
            <SelectItem value="android">仅 Android</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function AppStep2({ config, setConfig }: BuilderStepProps) {
  const features = ["用户认证", "推送通知", "数据存储", "支付集成", "地图定位", "社交分享"];
  return (
    <div className="grid grid-cols-2 gap-3">
      {features.map((f) => {
        const selected = (config.features as string[] || []).includes(f);
        return (
          <button key={f} onClick={() => setConfig({ ...config, features: selected ? (config.features as string[]).filter((x) => x !== f) : [...(config.features as string[] || []), f] })}
            className={`rounded-lg border p-4 text-left text-sm transition-colors ${selected ? "border-primary bg-primary/[0.05] text-primary font-medium" : "border-border hover:border-muted-foreground/30"}`}>
            {f}
          </button>
        );
      })}
    </div>
  );
}

// ── Miniapp steps ────────────────────────────────────────────

function MiniappStep0({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">小程序名称</Label>
        <Input id="name" placeholder="例如：社区团购" value={String(config.name || "")} onChange={(e) => setConfig({ ...config, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">小程序描述</Label>
        <Textarea id="desc" placeholder="描述你的小程序功能..." rows={4} value={String(config.description || "")} onChange={(e) => setConfig({ ...config, description: e.target.value })} />
      </div>
    </div>
  );
}

function MiniappStep1({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label>小程序类型</Label>
        <Select value={config.type || "wechat"} onValueChange={(v) => setConfig({ ...config, type: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="wechat">微信小程序</SelectItem>
            <SelectItem value="alipay">支付宝小程序</SelectItem>
            <SelectItem value="douyin">抖音小程序</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2"><Label>开发框架</Label>
        <Select value={config.framework || "taro"} onValueChange={(v) => setConfig({ ...config, framework: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="taro">Taro</SelectItem>
            <SelectItem value="uni-app">uni-app</SelectItem>
            <SelectItem value="native">原生开发</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function MiniappStep2({ config, setConfig }: BuilderStepProps) {
  const scenes = ["电商购物", "内容展示", "工具服务", "社交互动", "企业应用"];
  return (
    <div className="grid grid-cols-2 gap-3">
      {scenes.map((s) => {
        const selected = (config.scenes as string[] || []).includes(s);
        return (
          <button key={s} onClick={() => setConfig({ ...config, scenes: selected ? (config.scenes as string[]).filter((x) => x !== s) : [...(config.scenes as string[] || []), s] })}
            className={`rounded-lg border p-4 text-left text-sm transition-colors ${selected ? "border-emerald-500 bg-emerald-500/[0.05] text-emerald-600 font-medium" : "border-border hover:border-muted-foreground/30"}`}>
            {s}
          </button>
        );
      })}
    </div>
  );
}

// ── Web steps ─────────────────────────────────────────────────

function WebStep0({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Web 应用名称</Label>
        <Input id="name" placeholder="例如：企业官网" value={String(config.name || "")} onChange={(e) => setConfig({ ...config, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">应用描述</Label>
        <Textarea id="desc" placeholder="描述你的 Web 应用..." rows={4} value={String(config.description || "")} onChange={(e) => setConfig({ ...config, description: e.target.value })} />
      </div>
    </div>
  );
}

function WebStep1({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label>前端框架</Label>
        <Select value={config.framework || "nextjs"} onValueChange={(v) => setConfig({ ...config, framework: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="nextjs">Next.js</SelectItem>
            <SelectItem value="vite">Vite + React</SelectItem>
            <SelectItem value="vue">Vue 3</SelectItem>
            <SelectItem value="svelte">SvelteKit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2"><Label>样式方案</Label>
        <Select value={config.styling || "tailwind"} onValueChange={(v) => setConfig({ ...config, styling: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="tailwind">Tailwind CSS</SelectItem>
            <SelectItem value="css-modules">CSS Modules</SelectItem>
            <SelectItem value="styled">Styled Components</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function WebStep2({ config, setConfig }: BuilderStepProps) {
  const pages = ["首页", "关于我们", "产品展示", "联系表单", "用户登录", "仪表盘"];
  return (
    <div className="grid grid-cols-2 gap-3">
      {pages.map((p) => {
        const selected = (config.pages as string[] || []).includes(p);
        return (
          <button key={p} onClick={() => setConfig({ ...config, pages: selected ? (config.pages as string[]).filter((x) => x !== p) : [...(config.pages as string[] || []), p] })}
            className={`rounded-lg border p-4 text-left text-sm transition-colors ${selected ? "border-violet-500 bg-violet-500/[0.05] text-violet-600 font-medium" : "border-border hover:border-muted-foreground/30"}`}>
            {p}
          </button>
        );
      })}
    </div>
  );
}

// ── Skill steps ───────────────────────────────────────────────

function SkillStep0({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Skill 名称</Label>
        <Input id="name" placeholder="例如：代码审查助手" value={String(config.name || "")} onChange={(e) => setConfig({ ...config, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Skill 描述</Label>
        <Textarea id="desc" placeholder="描述这个 Skill 的能力和作用..." rows={3} value={String(config.description || "")} onChange={(e) => setConfig({ ...config, description: e.target.value })} />
      </div>
    </div>
  );
}

function SkillStep1({ config, setConfig }: BuilderStepProps) {
  const capabilities = [
    { id: "code-gen", label: "代码生成", desc: "根据描述生成代码" },
    { id: "debug", label: "调试诊断", desc: "分析和修复错误" },
    { id: "refactor", label: "代码重构", desc: "优化已有代码结构" },
    { id: "doc", label: "文档生成", desc: "自动生成 API 文档" },
    { id: "test", label: "测试生成", desc: "自动编写单元测试" },
    { id: "deploy", label: "部署集成", desc: "CI/CD 集成" },
  ];
  return (
    <div className="space-y-4">
      <Label>选择 Skill 能力（可多选）</Label>
      <div className="grid grid-cols-2 gap-3">
        {capabilities.map((c) => {
          const selected = (config.capabilities as string[] || []).includes(c.id);
          return (
            <button key={c.id} onClick={() => setConfig({ ...config, capabilities: selected ? (config.capabilities as string[]).filter((x) => x !== c.id) : [...(config.capabilities as string[] || []), c.id] })}
              className={`rounded-lg border p-3 text-left transition-colors ${selected ? "border-amber-500 bg-amber-500/[0.05] text-amber-600 font-medium" : "border-border hover:border-muted-foreground/30"}`}>
              <div className="text-sm font-medium">{c.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SkillStep2({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>MCP Server 名称</Label>
        <Input placeholder="my-skill-server" value={String(config.mcpServer || "")} onChange={(e) => setConfig({ ...config, mcpServer: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>工具描述模板</Label>
        <Textarea placeholder="描述 Skill 对外暴露的工具接口..." rows={3} value={String(config.toolDef || "")} onChange={(e) => setConfig({ ...config, toolDef: e.target.value })} />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <SwitchUI id="publish" checked={config.publishToMarketplace as boolean || false} onCheckedChange={(v) => setConfig({ ...config, publishToMarketplace: v })} />
        <Label htmlFor="publish" className="text-sm">完成后发布到工具市场</Label>
      </div>
    </div>
  );
}

// ── Agent steps ───────────────────────────────────────────────

function AgentStep0({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Agent 名称</Label>
        <Input id="name" placeholder="例如：客服小助手" value={String(config.name || "")} onChange={(e) => setConfig({ ...config, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Agent 角色描述</Label>
        <Textarea id="desc" placeholder="例如：你是一个专业的客服 Agent，帮助用户解决产品问题..." rows={4} value={String(config.description || "")} onChange={(e) => setConfig({ ...config, description: e.target.value })} />
      </div>
    </div>
  );
}

function AgentStep1({ config, setConfig }: BuilderStepProps) {
  const tools = [
    { id: "web-search", label: "网络搜索", desc: "搜索互联网获取信息" },
    { id: "file-read", label: "文件读取", desc: "读取和分析文件内容" },
    { id: "api-call", label: "API 调用", desc: "调用外部 API" },
    { id: "code-exec", label: "代码执行", desc: "在沙箱中运行代码" },
    { id: "db-query", label: "数据库查询", desc: "执行数据库查询" },
    { id: "email", label: "邮件发送", desc: "发送电子邮件" },
  ];
  return (
    <div className="space-y-4">
      <Label>选择可用工具</Label>
      <div className="grid grid-cols-2 gap-3">
        {tools.map((t) => {
          const selected = (config.tools as string[] || []).includes(t.id);
          return (
            <button key={t.id} onClick={() => setConfig({ ...config, tools: selected ? (config.tools as string[]).filter((x) => x !== t.id) : [...(config.tools as string[] || []), t.id] })}
              className={`rounded-lg border p-3 text-left transition-colors ${selected ? "border-rose-500 bg-rose-500/[0.05] text-rose-600 font-medium" : "border-border hover:border-muted-foreground/30"}`}>
              <div className="text-sm font-medium">{t.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AgentStep2({ config, setConfig }: BuilderStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>System Prompt 完整版</Label>
        <Textarea placeholder="编写完整的 System Prompt..." rows={8} value={config.systemPrompt as string || ""} onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>模型选择</Label>
        <Select value={(config.model as string) || "deepseek-v4"} onValueChange={(v) => setConfig({ ...config, model: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="deepseek-v4">DeepSeek V4 Pro</SelectItem>
            <SelectItem value="claude-opus">Claude Opus</SelectItem>
            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ── Router ────────────────────────────────────────────────────

type StepRenderer = ({ config, setConfig }: BuilderStepProps) => React.ReactNode;

const builderDefs: Record<
  BuilderId,
  {
    title: string;
    description: string;
    steps: { id: string; label: string; description?: string }[];
    icon: React.ElementType;
    renderers: StepRenderer[];
    defaultConfig: BuilderConfig;
  }
> = {
  app: {
    title: "App 构建器",
    description: "配置并生成跨平台移动应用",
    steps: [
      { id: "basics", label: "基本信息", description: "App 名称、描述" },
      { id: "tech", label: "技术选型", description: "框架、平台" },
      { id: "features", label: "功能配置", description: "核心功能" },
    ],
    icon: Smartphone,
    renderers: [AppStep0, AppStep1, AppStep2],
    defaultConfig: { framework: "react-native", platform: "both", features: [] },
  },

  miniapp: {
    title: "小程序构建器",
    description: "配置并生成跨平台小程序",
    steps: [
      { id: "basics", label: "基本信息", description: "名称、描述" },
      { id: "tech", label: "技术选型", description: "平台、框架" },
      { id: "scenes", label: "业务场景", description: "场景配置" },
    ],
    icon: AppWindow,
    renderers: [MiniappStep0, MiniappStep1, MiniappStep2],
    defaultConfig: { type: "wechat", framework: "taro", scenes: [] },
  },

  web: {
    title: "Web 构建器",
    description: "配置并生成 Web 应用",
    steps: [
      { id: "basics", label: "基本信息", description: "名称、描述" },
      { id: "tech", label: "技术选型", description: "框架、样式" },
      { id: "pages", label: "页面配置", description: "选择页面" },
    ],
    icon: Globe,
    renderers: [WebStep0, WebStep1, WebStep2],
    defaultConfig: { framework: "nextjs", styling: "tailwind", pages: [] },
  },

  skill: {
    title: "Skill 编辑器",
    description: "创建自定义 AI Skill",
    steps: [
      { id: "basics", label: "基本信息", description: "名称、描述" },
      { id: "capabilities", label: "能力选择", description: "Skill 能力" },
      { id: "config", label: "高级配置", description: "MCP、发布" },
    ],
    icon: Puzzle,
    renderers: [SkillStep0, SkillStep1, SkillStep2],
    defaultConfig: { capabilities: [], publishToMarketplace: false },
  },

  agent: {
    title: "Agent 构建器",
    description: "配置 AI Agent",
    steps: [
      { id: "basics", label: "基本信息", description: "名称、角色" },
      { id: "tools", label: "工具选择", description: "绑定工具" },
      { id: "prompt", label: "提示词 & 模型", description: "System Prompt" },
    ],
    icon: Bot,
    renderers: [AgentStep0, AgentStep1, AgentStep2],
    defaultConfig: { tools: [], model: "deepseek-v4" },
  },
};

export default function BuilderPage({ builderId }: { builderId: BuilderId }) {
  const def = builderDefs[builderId];
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [config, setConfig] = useState<BuilderConfig>({ ...def.defaultConfig });
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setCompletedSteps((s) => new Set([...s, step]));
    if (step < def.steps.length - 1) setStep(step + 1);
  };
  const handleBack = () => { if (step > 0) setStep(step - 1); };
  const handleStepClick = (i: number) => {
    if (completedSteps.has(i) || i < step) setStep(i);
  };
  const handleFinish = async () => {
    setCompletedSteps((s) => new Set([...s, step]));
    setSubmitting(true);
    setError(null);
    try {
      // 1. Create project via API
      const project = await api.post<ApiProject>("/api/projects", {
        name: (config.name as string) || `未命名${def.title}项目`,
        type: builderId,
        description: (config.description as string) || "",
        config: config,
        visibility: "private",
      });

      setCreatedProjectId(project.id);

      // 2. Optionally publish to marketplace
      if (config.publishToMarketplace) {
        try {
          await api.post(`/api/projects/${project.id}/publish`);
        } catch {
          // non-fatal: project created, just failed to publish
        }
      }

      setFinished(true);
    } catch (err: any) {
      setError(err?.message || "创建项目失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const StepRenderer = def.renderers[step];

  return (
    <MainLayout>
      <BuilderLayout
        title={def.title}
        description={def.description}
        icon={def.icon}
        steps={def.steps}
        currentStep={step}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
        onBack={handleBack}
        onNext={handleNext}
        onFinish={handleFinish}
        isLastStep={step === def.steps.length - 1}
      >
        {finished ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
              <CheckCircle2 size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-lg font-semibold mb-2">项目创建成功</h2>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              你的「{(config.name as string) || def.title}」项目已保存{config.publishToMarketplace ? "并提交到市场审核" : ""}。
            </p>
            {error && (
              <p className="text-sm text-destructive mb-4">{error}</p>
            )}
            <div className="flex gap-3 flex-wrap justify-center">
              {createdProjectId && (
                <Button onClick={() => router.push(`/projects/${createdProjectId}`)}>
                  <Eye size={14} className="mr-1.5" /> 查看项目
                </Button>
              )}
              <Button variant="outline" onClick={() => router.push(`/builder/${builderId}`)}>
                <Plus size={14} className="mr-1.5" /> 新建
              </Button>
              <Button variant="outline" onClick={() => router.push("/projects")}>
                <FolderOpen size={14} className="mr-1.5" /> 我的项目
              </Button>
              <Button variant="ghost" onClick={() => router.push("/")}>
                返回仪表盘
              </Button>
            </div>
          </div>
        ) : (
          <StepRenderer config={config} setConfig={setConfig} />
        )}
      </BuilderLayout>
    </MainLayout>
  );
}
