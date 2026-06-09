# AI 工具提供系统 — 架构设计文档

## 概述

AI 工具提供系统是一个一站式平台，支持用户搭建、管理和发布 AI 工具（App、小程序、Web 应用、Skill、Agent），提供开发诊断、工具市场等能力。

**决策记录**:
| 决策 | 选择 |
|------|------|
| MVP 深度 | 全栈真跑 — 每个模块都可真实产出 |
| 数据库 | 阿里云 RDS PostgreSQL 16 |
| 部署 | **阿里云 ECS × 1**（前后端同一台，起两个端口） |

---

## 1. 系统架构全景

```
┌──────────────────────────────────────────────────────────┐
│                      用户入口                             │
│          Web 控制台 (Next.js)  ·  CLI  ·  API            │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                    API Gateway                           │
│                (阿里云 ALB / Nginx)                       │
└──────┬────────────────┬────────────────────┬─────────────┘
       │                │                    │
┌──────▼──────┐  ┌──────▼──────────┐  ┌─────▼──────────┐
│  Auth 服务  │  │  Core 业务服务   │  │  AI 推理服务    │
│ NextAuth.js │  │  (NestJS / Go)  │  │  LLM Proxy     │
│ Casbin RBAC │  │                 │  │  Vercel AI SDK │
└──────┬──────┘  └──────┬──────────┘  └─────┬──────────┘
       │                │                    │
┌──────▼────────────────▼────────────────────▼────────────┐
│                     数据与基础设施                        │
│  PostgreSQL · Redis · MinIO/OSS · RabbitMQ              │
│  Elasticsearch · Docker/K8s · Prometheus·Grafana        │
└──────────────────────────────────────────────────────────┘
```

---

## 2. 技术栈总览

| 层面 | 技术 | 说明 |
|------|------|------|
| 前端 | Next.js 14 (App Router) + TypeScript | 服务端渲染 + 静态生成 |
| 样式 | Tailwind CSS 4 + shadcn/ui | 设计系统 + 无障碍组件 |
| 状态管理 | Zustand + React Context | 轻量、按需分片 |
| 后端框架 | NestJS (Node.js) / Go (高性能服务) | 按服务特征选语言 |
| 数据库 | PostgreSQL 16 (RDS) | 核心事务数据 |
| 缓存 | Redis 7.0 | 会话、热度计数、预览态 |
| 对象存储 | 阿里云 OSS | 代码文件、资源、模板 |
| 搜索 | Elasticsearch 8.x | 工具市场全文搜索 |
| 消息队列 | 阿里云 RocketMQ / RabbitMQ | 构建任务、异步诊断 |
| 容器编排 | 阿里云 ACK (托管 K8s) | 构建沙箱、服务调度 |
| AI 推理 | Claude API / 通义千问 / Vercel AI SDK | 代码生成、Agent 执行 |
| 认证 | NextAuth.js | OAuth (GitHub/Google) + 邮箱 + 手机 |
| 监控 | Prometheus + Grafana + 阿里云 SLS | 服务监控 + 日志 |
| CI/CD | GitHub Actions | 自动构建、部署 |

---

## 3. 核心模块依赖矩阵

### 3.1 构建器模块

| 子模块 | 功能 | 后端依赖 | 第三方 API |
|--------|------|----------|------------|
| App 构建器 | 移动 App 搭建 | 代码生成服务、模板引擎、OSS | — |
| 小程序构建器 | 微信小程序搭建 | 同上 | 微信开发者 API |
| Web 构建器 | Web 应用搭建 | 同上 | Vercel Deploy API |
| Skill 编辑器 | 自定义 Skill | Skill 模板库、向量检索 | Claude API |
| Agent 构建器 | AI Agent 配置 | Agent Runtime、MCP Server 管理 | Claude API / MCP |

**构建流程**:
```
用户配置 → 模板匹配(ES搜索) → LLM 代码生成 → Docker 沙箱构建 → OSS 存储产物
                                     ↓
                              WebSocket 实时推送进度
```

### 3.2 诊断模块

| 子模块 | 功能 | 后端依赖 | 数据流 |
|--------|------|----------|--------|
| 构建报错分析 | 解析编译错误并给出修复建议 | LLM + 错误知识库(PGVector) | 用户粘贴错误 → LLM 分析 → 返回修复方案 |
| 性能审计 | Lighthouse 自动审计 | Puppeteer/Playwright | URL 输入 → 无头浏览器 → 报告生成 |
| 依赖检查 | npm/pip 依赖安全扫描 | npm audit API / Snyk SDK | 依赖列表 → 漏洞库匹配 → 升级建议 |
| 日志解读 | 云产品日志语义分析 | LLM + 日志模板匹配 | 日志片段 → 模式识别 → 语义解读 |

### 3.3 工具市场

| 功能 | 后端依赖 | 说明 |
|------|----------|------|
| 工具发布 | 项目服务 + OSS | 打包 → 审核 → 上架 |
| 全文搜索 | Elasticsearch | 名称、描述、标签分词搜索 |
| 分类筛选 | 数据库索引 | App/小程序/Web/Skill/Agent |
| 评分评论 | PostgreSQL + Redis | 评分计数缓存，防刷限流 |
| 下载统计 | Redis 计数器 + ClickHouse 聚合 | 实时 + 历史趋势 |

### 3.4 用户与权限

| 角色 | 权限范围 |
|------|----------|
| **管理员** | 全部管理权限，工具审核 |
| **开发者** | 创建工具、查看诊断报告、发布到市场 |
| **浏览者** | 浏览市场、使用已有工具、运行诊断 |

---

## 4. 数据库核心表设计

```sql
-- 用户表
users (id, email, name, avatar_url, created_at, updated_at)

-- 项目表
projects (
  id, user_id, name, type(app|miniapp|web|skill|agent),
  status(draft|building|done|failed), config JSONB,
  output_url TEXT, created_at, updated_at
)

-- 工具市场
marketplace_tools (
  id, project_id, user_id, name, description,
  category, tags TEXT[], downloads INT DEFAULT 0,
  rating DECIMAL(2,1), status(pending|approved|rejected),
  created_at, updated_at
)

-- 诊断记录
diagnostic_reports (
  id, user_id, type(error|perf|dependency|log),
  input TEXT, result JSONB, created_at
)

-- Skill 定义 (MCP 兼容)
skills (
  id, user_id, name, description, manifest JSONB,
  mcp_server_config JSONB, created_at, updated_at
)

-- Agent 定义
agents (
  id, user_id, name, system_prompt TEXT,
  tools JSONB, model VARCHAR, config JSONB,
  created_at, updated_at
)
```

---

## 5. API 设计 (RESTful)

### 5.1 构建器

| Method | Path | 说明 |
|--------|------|------|
| `POST` | `/api/projects` | 创建新项目 |
| `GET` | `/api/projects/:id` | 获取项目详情 |
| `PUT` | `/api/projects/:id/config` | 更新项目配置 |
| `POST` | `/api/projects/:id/build` | 触发构建 |
| `GET` | `/api/projects/:id/build/:buildId` | 查询构建状态 |
| `WS` | `/ws/build/:buildId` | 实时构建日志 |

### 5.2 诊断

| Method | Path | 说明 |
|--------|------|------|
| `POST` | `/api/diagnostics/analyze` | 提交诊断请求 |
| `GET` | `/api/diagnostics/:id` | 获取诊断结果 |
| `GET` | `/api/diagnostics/history` | 诊断历史列表 |
| `POST` | `/api/diagnostics/perf-audit` | 触发性能审计 |

### 5.3 市场

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/api/marketplace` | 工具列表（分页+筛选+搜索） |
| `GET` | `/api/marketplace/:id` | 工具详情 |
| `POST` | `/api/marketplace` | 发布工具 |
| `POST` | `/api/marketplace/:id/rate` | 评分 |
| `GET` | `/api/marketplace/:id/versions` | 版本历史 |

### 5.4 用户

| Method | Path | 说明 |
|--------|------|------|
| `POST` | `/api/auth/signup` | 注册 |
| `POST` | `/api/auth/signin` | 登录 |
| `GET` | `/api/user/profile` | 个人信息 |
| `PUT` | `/api/user/settings` | 更新设置 |

---

## 6. AI 推理层

```
                    ┌─────────────────────┐
                    │    LLM Gateway      │
                    │  (统一路由 + 降级)   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   DeepSeek V4 Pro   │
                    │   (统一主力模型)     │
                    │  • 代码生成          │
                    │  • Agent 执行        │
                    │  • 诊断推理          │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Vercel AI SDK      │
                    │  (OpenAI Compatible)  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼──────────────────┐
              │                │                  │
    ┌─────────▼────┐  ┌───────▼──────┐  ┌───────▼──────┐
    │ Stream 生成  │  │ Tool Calling │  │ RAG 增强     │
    │ (代码+配置)  │  │ (Agent 执行) │  │ (PGVector)   │
    └──────────────┘  └──────────────┘  └──────────────┘
```

**推理场景分布**:

| 场景 | 模型 | 说明 |
|------|------|------|
| 代码生成 | **DeepSeek V4 Pro** | 全场景主力，代码+推理能力一体 |
| 配置生成 | **DeepSeek V4 Pro** | JSON/YAML 结构化输出 |
| 诊断分析 | **DeepSeek V4 Pro** | 复杂错误链路分析 |
| Agent 执行 | **DeepSeek V4 Pro** | Tool Calling / Function Calling |
| Embedding | **DeepSeek V4 Pro** | 语义搜索 |

**DeepSeek V4 Pro 优势**:
- 一个模型覆盖全部场景，无需多模型调度
- 与 OpenAI SDK 完全兼容，Vercel AI SDK 零修改接入
- 国内直接充值，无需海外信用卡
- 相比 Claude Opus 成本极低

---

## 7. MVP 全栈真跑方案

### 7.1 当前开发阶段总览

```
                     ┌──────────────┐
                     │   Vercel     │  ← Next.js 前端部署
                     │  (免费起步)   │
                     └──────┬───────┘
                            │ HTTPS
                            ▼
                     ┌──────────────┐
                     │ 阿里云 ECS    │  ← 后端 API (NestJS)
                     │ (ECS × 1)    │     /api/* 所有接口
                     │ 2c4g 起步    │
                     └──────┬───────┘
                            │ 内网
              ┌─────────────┼─────────────┐
              │             │             │
       ┌──────▼──────┐ ┌───▼──────┐ ┌───▼──────────┐
       │  RDS PG 16  │ │  Redis   │ │  Claude API   │
       │  基础版     │ │  可选    │ │  互联网调用    │
       └─────────────┘ └──────────┘ └──────────────┘
```

### 7.2 分模块 MVP 交付清单

#### 前端 (Next.js on Vercel)
| 页面 | 状态 | MVP 完成度 |
|------|------|-----------|
| 仪表盘 `/` | 待开发 | 统计卡片 + 项目列表 + 快速创建 |
| App 构建器 `/builder/app` | 待开发 | 配置表单 → 调后端 LLM 生成代码 |
| 小程序构建器 `/builder/miniapp` | 待开发 | 同上，微信小程序模板 |
| Web 构建器 `/builder/web` | 待开发 | 同上，Next.js/React 模板 |
| Skill 编辑器 `/builder/skill` | 待开发 | 表单 → LLM 生成 MCP 配置 |
| Agent 构建器 `/builder/agent` | 待开发 | System prompt + Tool 选择 → Agent 实例 |
| 诊断 `/diagnostics` | 待开发 | 输入 → LLM 分析 → 结果展示 |
| 工具市场 `/marketplace` | 待开发 | 从 DB 加载工具列表 |
| 设置 `/settings` | 待开发 | 主题/偏好存本地 + DB |

#### 后端 API (NestJS on ECS)
| 服务组 | 接口数 | 核心依赖 |
|--------|--------|----------|
| Auth | 4 | NextAuth.js + DB |
| Projects CRUD | 5 | DB + OSS |
| Build | 3 + WebSocket | LLM API + Docker 沙箱 |
| Diagnostics | 4 | LLM API |
| Marketplace | 5 | DB + 搜索 |

#### 数据层 (阿里云 RDS)
- 7 张表，全部有迁移脚本
- Prisma ORM 管理 schema

### 7.3 后端项目结构（NestJS）

```
server/
├── src/
│   ├── main.ts                  # 入口，端口 4000
│   ├── app.module.ts            # 根模块
│   ├── common/
│   │   ├── prisma/              # Prisma 客户端 + schema
│   │   ├── auth/                # JWT Guard + 策略
│   │   └── llm/                 # Claude API 封装
│   ├── projects/                # 项目 CRUD
│   ├── builder/                 # 构建器服务
│   │   ├── builder.service.ts   # 构建编排逻辑
│   │   ├── builder.gateway.ts   # WebSocket 推送
│   │   └── sandbox/             # Docker 沙箱管理
│   ├── diagnostics/             # 诊断服务
│   ├── marketplace/             # 市场服务
│   └── user/                    # 用户服务
├── prisma/
│   └── schema.prisma            # 数据库模型
├── Dockerfile
└── package.json
```

### 7.4 MVP 关键流程

#### 构建流程（完整）
```
1. 用户在前端 Builder 页面填写配置
2. POST /api/projects → 创建项目记录 (DB)
3. POST /api/projects/:id/build → 触发构建
   → 从 DB 读取项目 config
   → 匹配模板（内置模板库）
   → 组装 prompt
   → 调用 Claude API 流式生成代码
   → WebSocket 推送生成进度
   → 代码写入临时文件
   → Docker 沙箱内执行 npm install && npm build
   → 构建产物上传 OSS
   → WebSocket 推送完成 + OSS 下载链接
4. 用户收到通知，下载/预览产物
```

#### 诊断流程
```
1. 用户选择诊断类型，输入内容
2. POST /api/diagnostics/analyze
   → 存入 DB (status: pending)
   → 调用 Claude API + 对应 prompt 模板
   → 流式返回分析结果
3. 结果存入 DB (status: done)，写入 result JSONB
4. 前端展示结果卡片
```

#### 市场工具发布流程
```
1. 用户在构建器完成项目后，点击"发布到市场"
2. POST /api/marketplace → status: pending
3. 管理员审核 (或 MVP 先自动通过)
4. 工具出现在市场列表，可从 DB 查询/搜索
```

### 7.5 技术选型理由

| 问题 | 选择 | 理由 |
|------|------|------|
| 为什么 NestJS 做后端？ | NestJS | 和 Next.js 共享 TypeScript 生态、Prisma Client 复用、模块化架构 |
| 为什么不用 Next.js API Routes？ | 单独 NestJS | API Routes 不适合 WebSocket 密集、Docker 沙箱调度的场景 |
| Vercel 能调 ECS 吗？ | 能 | ECS 绑公网 IP 或用阿里云 API 网关，前端 axios 跨域请求 |
| MVP 一定要 Redis 吗？ | 可选 | 构建进度用 WebSocket 推送即可，会话用 JWT 无状态 |
| MVP 一定要 OSS 吗？ | 建议 | 构建产物（zip/apk）不能用 DB 存，ECS 本地磁盘不稳定 |
| Docker 沙箱安全性够吗？ | MVP 够用 | 加上资源限制、只读 rootfs、禁止网络出站、30s timeout |

### 7.6 MVP 开发顺序（总览）

```
Phase A: 基础设施 (1-2天)
  ├── 阿里云 ECS + RDS 购买配置
  ├── NestJS 项目初始化 + Prisma schema
  ├── Docker + DB 迁移脚本
  └── Claude API Key 配置 + 基础封装

Phase B: 前端完成 (当前继续)
  ├── Step 2: 布局 + 主题
  ├── Step 3: 仪表盘
  ├── Step 4: 5 个构建器页面
  ├── Step 5: 诊断页面
  ├── Step 6: 市场页面
  └── Step 7: 设置页面

Phase C: 后端 API (前后端联调)
  ├── Auth API (NextAuth.js)
  ├── Projects CRUD
  ├── Builder + WebSocket
  ├── Diagnostics LLM 调用
  └── Marketplace 搜索

Phase D: 联调 + 部署
  ├── 前端部署 Vercel
  ├── 后端部署 ECS (PM2)
  ├── 配置 CORS + 域名
  └── 端到端测试
```

---

## 8. 生产部署拓扑（阿里云）

```
                        互联网
                          │
                   ┌──────▼──────┐
                   │ 阿里云 CDN   │  ← 静态资源加速（可选）
                   └──────┬──────┘
                          │
                   ┌──────▼──────┐
                   │ Nginx 反向代理│ ← 80/443 → 内部端口分流
                   │  (ECS 上)    │
                   └──────┬──────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
       ┌──────▼──────┐ ┌─▼──────────┐
       │ Next.js 前端 │ │ NestJS API │
       │ 端口 :3000  │ │ 端口 :4000 │
       └─────────────┘ └─────┬──────┘
                              │
       ┌──────────────────────▼──────────┐
       │           阿里云 VPC             │
       │  ┌──────────┐ ┌──────────────┐  │
       │  │ RDS PG 16│ │ OSS + Redis  │  │
       │  └──────────┘ └──────────────┘  │
       └─────────────────────────────────┘
```

**单 ECS + Nginx 路由规则**:
```
                          ┌── /       → localhost:3000 (Next.js 前端)
example.com:80/443 ── Nginx
                          └── /api/*  → localhost:4000 (NestJS 后端)
                                       /ws/*   → localhost:4000 (WebSocket)
```

---

## 9. 预估成本（阿里云 / 月）

| 产品 | MVP 配置 | 月费估算 | 生产配置 | 月费估算 |
|------|----------|----------|----------|----------|
| ECS (计算) | 2 台 2c4g | ¥300 | 4 台 4c8g + GPU | ¥3000+ |
| RDS PostgreSQL | 基础版 2c4g | ¥400 | 高可用 4c8g | ¥1500 |
| Redis | 基础版 2GB | ¥150 | 标准版 8GB | ¥600 |
| OSS | 标准存储 50GB | ¥5 | 标准存储 500GB + CDN | ¥200 |
| ACK (K8s) | — | — | Pro 版 3 节点 | ¥2000+ |
| Elasticsearch | — | — | 标准版 4c16g | ¥1500 |
| LLM API | DeepSeek API | ¥50-200 | 同左 | ¥200-500 |

**MVP 合计**: ≈ ¥855/月 ｜ **生产合计**: ≈ ¥8800+/月（不含 AI API）

---

## 10. 安全设计要点

| 层面 | 措施 |
|------|------|
| 构建沙箱 | Docker 隔离 + 资源限制 (CPU/Mem/Net/Timeout) |
| 代码注入防范 | 禁止 `exec()`、禁用网络出站、文件系统只读挂载 |
| API 安全 | Rate Limiting (Redis 令牌桶)、JWT 过期 + 刷新机制 |
| 数据安全 | 敏感配置加密存储 (KMS)、用户数据隔离 |
| 供应链 | npm 包白名单、`npm audit` 自动扫描、SBOM 生成 |
