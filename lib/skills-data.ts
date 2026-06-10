import type { SkillEntry } from "@/types";

export const SKILLS: SkillEntry[] = [
  // ── 🎨 内容创作 ────────────────────────────────────
  {
    id: "ai-image-generation", name: "ai-image-generation", title: "AI 图像生成",
    description: "通过 RunComfy CLI 生成和编辑图像。支持 FLUX 2、Google Nano Banana、OpenAI GPT Image 等模型，文本到图像、图像到图像全流程。",
    category: "内容创作", icon: "Image", tags: ["AI", "图像", "生成", "FLUX"], mcpCompatible: false,
    trigger: "生成图像、制作图片、文字转图、AI 图像、image to image",
  },
  {
    id: "ai-video-generation", name: "ai-video-generation", title: "AI 视频生成",
    description: "通过 RunComfy CLI 生成 AI 视频。支持 HappyHorse、Wan-AI、Seedance、Kling、Veo 等模型，文字到视频、图像到视频。",
    category: "内容创作", icon: "Video", tags: ["AI", "视频", "生成", "RunComfy"], mcpCompatible: false,
    trigger: "生成视频、制作视频、文字转视频、AI 视频、animate",
  },
  {
    id: "image-to-video", name: "image-to-video", title: "图像转视频 Pro",
    description: "将任何静态图像动画化。根据场景自动选择 HappyHorse I2V、Wan 2.7（口型同步）或 Seedance 2.0 Pro（多模态动画）。",
    category: "内容创作", icon: "Film", tags: ["图像", "视频", "动画", "口型同步"], mcpCompatible: false,
    trigger: "image to video、图像转视频、动画化图像、让这张图动起来",
  },
  {
    id: "copywriting", name: "copywriting", title: "营销文案撰写",
    description: "专业转化文案撰写。覆盖首页、落地页、定价页、功能页、关于页等各类页面。理解产品、受众和品牌调性，输出高转化文案。",
    category: "内容创作", icon: "PenLine", tags: ["文案", "营销", "转化", "品牌"], mcpCompatible: false,
    trigger: "写文案、改善文案、改写页面、营销文案、标题、CTA、价值主张",
  },
  {
    id: "frontend-design", name: "frontend-design", title: "前端设计",
    description: "创建独特的、生产级前端界面。强调大胆的美学方向、排版和令人难忘的视觉选择，避免通用 AI 风格。",
    category: "内容创作", icon: "Palette", tags: ["UI", "设计", "前端", "排版"], mcpCompatible: false,
    trigger: "构建网页、设计界面、landing page、dashboard、React 组件、样式美化",
  },
  {
    id: "image-enhancer", name: "image-enhancer", title: "图像增强",
    description: "提升图像质量：增强分辨率、锐度和清晰度。减少压缩伪影。针对不同用途（Web、打印、社交媒体）优化输出。",
    category: "内容创作", icon: "Sparkles", tags: ["图像", "增强", "分辨率", "清晰度"], mcpCompatible: false,
    trigger: "增强图像、提高画质、锐化、降噪、upscale",
  },

  // ── 🔌 自动化集成 ─────────────────────────────────
  {
    id: "21risk-automation", name: "21risk-automation", title: "21Risk 自动化",
    description: "自动化 21risk 风险管理操作。通过 Rube MCP (Composio) 连接，动态发现工具模式。",
    category: "自动化集成", icon: "ShieldAlert", tags: ["风险", "合规", "自动化"], mcpCompatible: true,
    trigger: "自动化 21risk 任务",
  },
  {
    id: "2chat-automation", name: "2chat-automation", title: "2Chat 自动化",
    description: "自动化 2chat 消息和聊天平台操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "MessageCircle", tags: ["聊天", "消息", "自动化"], mcpCompatible: true,
    trigger: "自动化 2chat 任务",
  },
  {
    id: "ably-automation", name: "ably-automation", title: "Ably 实时消息自动化",
    description: "自动化 Ably 实时消息传递操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "Radio", tags: ["实时", "消息", "Ably"], mcpCompatible: true,
    trigger: "自动化 Ably 任务",
  },
  {
    id: "active-campaign-automation", name: "active-campaign-automation", title: "ActiveCampaign 自动化",
    description: "自动化 ActiveCampaign 电子邮件营销操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "Mail", tags: ["邮件", "营销", "自动化"], mcpCompatible: true,
    trigger: "自动化 ActiveCampaign 任务",
  },
  {
    id: "all-images-ai-automation", name: "all-images-ai-automation", title: "All Images AI 自动化",
    description: "自动化 AI 图像生成/编辑操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "Images", tags: ["AI", "图像", "自动化"], mcpCompatible: true,
    trigger: "自动化 All Images AI 任务",
  },
  {
    id: "buildkite-automation", name: "buildkite-automation", title: "Buildkite CI/CD 自动化",
    description: "自动化 Buildkite CI/CD 流水线操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "Rocket", tags: ["CI/CD", "构建", "自动化"], mcpCompatible: true,
    trigger: "自动化 Buildkite 任务",
  },
  {
    id: "builtwith-automation", name: "builtwith-automation", title: "BuiltWith 技术查询自动化",
    description: "自动化 BuiltWith 网站技术栈查询操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "SearchCode", tags: ["技术栈", "分析", "自动化"], mcpCompatible: true,
    trigger: "自动化 BuiltWith 任务",
  },
  {
    id: "netsuite-automation", name: "netsuite-automation", title: "NetSuite ERP 自动化",
    description: "通过 Oracle NetSuite ERP 管理客户、销售订单、发票、库存和记录。支持 SuiteQL 查询。",
    category: "自动化集成", icon: "Briefcase", tags: ["ERP", "财务", "库存", "SuiteQL"], mcpCompatible: true,
    trigger: "自动化 NetSuite 任务、管理客户、销售订单、发票",
  },
  {
    id: "quickbooks-automation", name: "quickbooks-automation", title: "QuickBooks 自动化",
    description: "管理 QuickBooks Online 中的发票、客户、账户和付款，简化簿记流程。",
    category: "自动化集成", icon: "Calculator", tags: ["财务", "发票", "簿记", "QuickBooks"], mcpCompatible: true,
    trigger: "自动化 QuickBooks 任务、管理发票、客户、付款",
  },
  {
    id: "recruitee-automation", name: "recruitee-automation", title: "Recruitee ATS 自动化",
    description: "自动化 Recruitee 招聘管理系统操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "UserPlus", tags: ["招聘", "ATS", "HR"], mcpCompatible: true,
    trigger: "自动化 Recruitee 任务",
  },
  {
    id: "smartrecruiters-automation", name: "smartrecruiters-automation", title: "SmartRecruiters 自动化",
    description: "自动化 SmartRecruiters 招聘管理系统操作。通过 Rube MCP (Composio) 连接。",
    category: "自动化集成", icon: "Users", tags: ["招聘", "ATS", "HR"], mcpCompatible: true,
    trigger: "自动化 SmartRecruiters 任务",
  },
  {
    id: "connect-apps", name: "connect-apps", title: "连接外部应用",
    description: "连接 Claude 到 1000+ 外部应用（Gmail、Slack、GitHub 等）。发送邮件、创建 Issue、发布消息。",
    category: "自动化集成", icon: "Plug", tags: ["集成", "Gmail", "Slack", "GitHub"], mcpCompatible: true,
    trigger: "连接应用、发送邮件、创建 Issue、发布消息",
  },
  {
    id: "recipe-label-and-archive-emails", name: "recipe-label-and-archive-emails", title: "Gmail 邮件标签与归档",
    description: "对匹配的 Gmail 邮件应用标签并归档，保持收件箱整洁。",
    category: "自动化集成", icon: "Tag", tags: ["邮件", "Gmail", "标签", "归档"], mcpCompatible: false,
    trigger: "标记邮件、归档邮件、清理收件箱",
  },

  // ── 🛠 开发工具 ────────────────────────────────────
  {
    id: "mcp-builder", name: "mcp-builder", title: "MCP Server 构建器",
    description: "创建高质量的 MCP（模型上下文协议）服务器，使 LLM 能够通过精心设计的工具与外部服务交互。支持 Python (FastMCP) 和 Node/TypeScript。",
    category: "开发工具", icon: "Server", tags: ["MCP", "Server", "API", "Python", "TypeScript"], mcpCompatible: false,
    trigger: "构建 MCP 服务器、集成外部 API、FastMCP、MCP SDK",
  },
  {
    id: "webapp-testing", name: "webapp-testing", title: "Web 应用测试",
    description: "通过 Playwright (Python) 测试本地 Web 应用。支持前端功能验证、UI 调试、浏览器截图和日志查看。",
    category: "开发工具", icon: "TestTube", tags: ["测试", "Playwright", "E2E", "截图"], mcpCompatible: false,
    trigger: "测试 Web 应用、Playwright、E2E 测试、截图、浏览器日志",
  },
  {
    id: "systematic-debugging", name: "systematic-debugging", title: "系统化调试",
    description: "严格的根因优先调试流程。铁律：没有根因调查就没有修复。适用于任何 bug、测试失败或异常行为。",
    category: "开发工具", icon: "Bug", tags: ["调试", "根因", "诊断", "修复"], mcpCompatible: false,
    trigger: "遇到 bug、测试失败、异常行为、建议修复",
  },
  {
    id: "improve-codebase-architecture", name: "improve-codebase-architecture", title: "代码架构优化",
    description: "使用领域语言和 ADR（架构决策记录）寻找代码库中的深化机会。将松散耦合的模块整合，提高可测试性和 AI 导航性。",
    category: "开发工具", icon: "Building", tags: ["架构", "重构", "模块", "ADR"], mcpCompatible: false,
    trigger: "改善架构、重构、寻找机会、整合模块",
  },
  {
    id: "supabase-postgres-best-practices", name: "supabase-postgres-best-practices", title: "Supabase Postgres 最佳实践",
    description: "Postgres 性能优化和最佳实践。8 类规则：查询性能、连接管理、模式设计、索引、RLS 等。每条规则都有正确/错误 SQL 对比。",
    category: "开发工具", icon: "Database", tags: ["Postgres", "SQL", "性能", "Supabase"], mcpCompatible: false,
    trigger: "Postgres 查询、数据库优化、模式设计、索引、RLS",
  },
  {
    id: "web-design-guidelines", name: "web-design-guidelines", title: "Web 界面规范审查",
    description: "审查 UI 代码是否符合 Web 界面规范。从 Vercel 的规范仓库获取最新规则并检查指定文件。",
    category: "开发工具", icon: "CheckSquare", tags: ["UI", "规范", "审查", "无障碍"], mcpCompatible: false,
    trigger: "审查 UI、检查无障碍、审计设计、审查 UX",
  },

  // ── 📄 文档处理 ────────────────────────────────────
  {
    id: "docx", name: "docx", title: "Word 文档处理",
    description: "创建、编辑和分析 .docx 文件。支持修订追踪、批注、格式化。完整的文档生命周期管理。",
    category: "文档处理", icon: "FileText", tags: ["Word", "文档", "编辑", "格式"], mcpCompatible: false,
    trigger: "创建文档、编辑内容、修订追踪、添加批注",
  },
  {
    id: "pptx", name: "pptx", title: "PPT 演示文稿处理",
    description: "创建、编辑和分析 .pptx 文件。支持布局、批注、演讲者备注、动画和设计元素。",
    category: "文档处理", icon: "Presentation", tags: ["PPT", "演示", "布局", "动画"], mcpCompatible: false,
    trigger: "创建演示文稿、编辑 PPT、布局、批注、演讲者备注",
  },
  {
    id: "xlsx", name: "xlsx", title: "Excel 表格处理",
    description: "创建、编辑和分析 .xlsx 文件。支持公式、格式化、数据分析和可视化。零公式错误，行业标准配色。",
    category: "文档处理", icon: "Table", tags: ["Excel", "表格", "公式", "数据分析"], mcpCompatible: false,
    trigger: "创建表格、数据分析、公式、格式化、可视化",
  },
  {
    id: "pdf", name: "pdf", title: "PDF 处理工具包",
    description: "全面的 PDF 操作：提取文字和表格、创建新 PDF、合并/拆分文档、处理表单。支持 OCR。",
    category: "文档处理", icon: "File", tags: ["PDF", "提取", "合并", "表单"], mcpCompatible: false,
    trigger: "PDF 处理、提取文字、合并、拆分、表单、OCR",
  },
  {
    id: "changelog-generator", name: "changelog-generator", title: "变更日志生成器",
    description: "从 git 提交自动创建面向用户的变更日志。分析提交历史，分类变更，将技术提交转换为清晰的发布说明。",
    category: "文档处理", icon: "ScrollText", tags: ["Git", "日志", "发布", "自动化"], mcpCompatible: false,
    trigger: "生成变更日志、发布说明、changelog",
  },

  // ── 🧠 设计 & 产品 ─────────────────────────────────
  {
    id: "ui-ux-pro-max", name: "ui-ux-pro-max", title: "UI/UX Pro Max 设计系统",
    description: "全面的 UI/UX 设计智能系统。优先级：无障碍 > 性能 > 触控 > 样式。覆盖 67 种风格、57 种字体配对、161 种调色板。",
    category: "设计产品", icon: "Layout", tags: ["设计", "UI", "UX", "调色板", "字体"], mcpCompatible: false,
    trigger: "设计、UI、UX、调色板、字体、无障碍、响应式设计、图表",
  },
  {
    id: "theme-factory", name: "theme-factory", title: "主题工厂",
    description: "为 artifacts 设置样式主题。10 种预设主题，每套包含协调的配色和字体配对。也可按需生成新主题。",
    category: "设计产品", icon: "PaintBucket", tags: ["主题", "样式", "配色", "字体"], mcpCompatible: false,
    trigger: "应用主题、设置样式、配色方案、品牌风格",
  },
  {
    id: "brand-guidelines", name: "brand-guidelines", title: "品牌规范",
    description: "应用 Anthropic 官方品牌颜色和字体到任何 artifact。精确的十六进制色值和排版规范。",
    category: "设计产品", icon: "Award", tags: ["品牌", "颜色", "Anthropic"], mcpCompatible: false,
    trigger: "品牌颜色、风格规范、视觉格式",
  },
  {
    id: "artifacts-builder", name: "artifacts-builder", title: "Artifacts 构建器",
    description: "创建复杂的多组件 claude.ai HTML artifacts。使用 React 18 + TypeScript + Vite + Tailwind + shadcn/ui。两阶段构建：初始化 + 打包。",
    category: "设计产品", icon: "Component", tags: ["React", "Artifact", "HTML", "shadcn"], mcpCompatible: false,
    trigger: "构建 artifact、复杂 HTML artifact、React + Tailwind",
  },
  {
    id: "product-requirements", name: "product-requirements", title: "产品需求文档",
    description: "交互式产品需求收集、分析和 PRD 生成。使用质量评分（100 分制，90+ 阈值）和迭代对话确保需求全面。",
    category: "设计产品", icon: "ClipboardList", tags: ["PRD", "需求", "规格", "文档"], mcpCompatible: false,
    trigger: "产品需求、功能规格、PRD 创建",
  },
  {
    id: "to-issues", name: "to-issues", title: "计划拆分为 Issue",
    description: "将计划、规格或 PRD 拆分为可独立领取的 issue，使用示踪子弹垂直切片。每个切片是跨所有层的完整路径。",
    category: "设计产品", icon: "ListTodo", tags: ["Issue", "计划", "拆分", "敏捷"], mcpCompatible: false,
    trigger: "转换计划、创建 issue、拆分工作",
  },
  {
    id: "writing-plans", name: "writing-plans", title: "实施计划编写",
    description: "为多步骤任务创建全面的实施计划。假设工程师对代码库零了解。保存到 `docs/superpowers/plans/`。",
    category: "设计产品", icon: "FileEdit", tags: ["计划", "实施", "文档"], mcpCompatible: false,
    trigger: "编写计划、实施步骤、多步骤任务",
  },
  {
    id: "lead-research-assistant", name: "lead-research-assistant", title: "销售线索研究",
    description: "识别高质量销售线索：分析你的业务，搜索目标公司（按行业、规模、技术栈），按匹配度排序，提供联系策略。",
    category: "设计产品", icon: "Target", tags: ["销售", "线索", "市场", "BD"], mcpCompatible: false,
    trigger: "寻找线索、研究客户、销售、业务拓展",
  },
  {
    id: "competitive-ads-extractor", name: "competitive-ads-extractor", title: "竞品广告分析",
    description: "提取和分析竞争对手的广告（Facebook、LinkedIn 等）。截图、分析信息传递、分类主题，识别成功模式。",
    category: "设计产品", icon: "Eye", tags: ["广告", "竞品", "分析", "营销"], mcpCompatible: false,
    trigger: "竞品广告、分析广告、广告库、竞品研究",
  },
];

export const SKILL_CATEGORIES = [
  { key: "全部", label: "全部", count: SKILLS.length },
  { key: "内容创作", label: "🎨 内容创作", count: SKILLS.filter((s) => s.category === "内容创作").length },
  { key: "自动化集成", label: "🔌 自动化集成", count: SKILLS.filter((s) => s.category === "自动化集成").length },
  { key: "开发工具", label: "🛠 开发工具", count: SKILLS.filter((s) => s.category === "开发工具").length },
  { key: "文档处理", label: "📄 文档处理", count: SKILLS.filter((s) => s.category === "文档处理").length },
  { key: "设计产品", label: "🧠 设计 & 产品", count: SKILLS.filter((s) => s.category === "设计产品").length },
];
