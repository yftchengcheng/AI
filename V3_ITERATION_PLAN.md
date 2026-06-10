# AI 工具平台 v3 迭代计划 — 对标 Coze 补齐核心能力

## 当前差距总结

对比 Coze 平台，我们的产品有 4 个核心缺失模块，按重要性排序：

| 优先级 | 模块 | Coze 做了什么 | 我们缺什么 | 迭代周期 |
|--------|------|--------------|-----------|---------|
| 🔴 P0 | **工作流引擎** | 可视化 DAG 编排，11+ 节点类型，并行/条件/循环 | 完全没有 | 2 周 |
| 🔴 P0 | **知识库 (RAG)** | 向量检索 + 混合搜索 + 答案溯源 | 完全没有 | 1.5 周 |
| 🔴 P0 | **Skill Runtime** | 插件商店 + MCP 协议 + Function Calling | 只有定义，无执行 | 1.5 周 |
| 🟡 P1 | **记忆系统** | 短期记忆 + 长期向量记忆 + 情景记忆 | 完全没有 | 1 周 |

---

## Phase 1: Skill Runtime（1.5 周）

> **目标**: Skill 不再是 JSON 配置，而是可真正调用的执行单元

### 1.1 Skill 执行引擎
```
用户 Skill 定义 → MCP Server 生成 → Function Calling 路由 → 执行结果返回
```

**后端新增**:
- `server/src/skills/` 模块
  - `skill-executor.service.ts` — 根据 Skill manifest 生成 MCP Server 代码，注册工具
  - `skill-registry.service.ts` — 管理 41 个内置 Skill 的运行时状态
  - `skill.controller.ts` — `POST /api/skills/:id/execute` 手动触发 Skill

**前端新增**:
- Skill 详情页增加 "测试运行" 按钮
- 输入参数 → 调用 API → 显示执行结果
- 执行历史记录

### 1.2 MCP 协议集成
- 使用 `@modelcontextprotocol/sdk` 生成标准 MCP Server
- 支持 SSE 和 stdio 两种传输方式
- 与 DeepSeek V4 Pro 的 Function Calling 互通

---

## Phase 2: 知识库 RAG（1.5 周）

> **目标**: Agent 和 Skill 可以挂载用户上传的文档，基于真实内容回答问题

### 2.1 文档管理
**后端新增**:
- `server/src/knowledge/` 模块
  - `document.service.ts` — 上传、解析、切片
  - `embedding.service.ts` — 调用 DeepSeek Embedding API
  - `vector-store.service.ts` — PGVector 存储和检索

**数据库新增**:
```prisma
model KnowledgeBase {
  id          String   @id @default(uuid())
  userId      String
  name        String
  description String?
  documents   Document[]
  createdAt   DateTime @default(now())
}

model Document {
  id              String        @id @default(uuid())
  knowledgeBaseId String
  name            String
  type            String        // pdf, docx, txt, md, url
  status          String        @default("processing") // processing, ready, failed
  chunks          DocumentChunk[]
}
```

### 2.2 前端 — 知识库管理页面
**新增路由**: `/knowledge`
- 知识库列表（创建、删除、重命名）
- 文档上传（拖拽上传 PDF/Word/TXT/Markdown）
- 文档状态（处理中/就绪/失败）
- 问答测试区（输入问题 → 检索结果 + LLM 回答 + 原文溯源）

### 2.3 知识库绑定
- Agent 构建器步骤中增加 "挂载知识库" 选项
- Skill 编辑器步骤中增加 "知识库绑定" 选项
- 构建完成后，Agent/Skill 可基于知识库回答问题

---

## Phase 3: 工作流引擎（2 周）

> **目标**: 用户可以可视化编排多步骤 AI 工作流，这是 Coze 最核心的能力

### 3.1 工作流编辑器（前端）

**新增路由**: `/workflow` + `/workflow/[id]`

```
┌──────────────────────────────────────────────────────────┐
│  工具栏: [保存] [运行] [发布] [版本历史]                   │
├──────────────┬───────────────────────────────────────────┤
│  节点面板     │                                           │
│              │          画布 (React Flow)                  │
│  ┌────────┐  │                                           │
│  │ Start  │  │     ┌──────┐    ┌──────┐    ┌──────┐     │
│  ├────────┤  │     │ LLM  │───→│ Code │───→│ End  │     │
│  │ LLM    │  │     └──────┘    └──────┘    └──────┘     │
│  ├────────┤  │                                           │
│  │ Code   │  │                                           │
│  ├────────┤  │                                           │
│  │Plugin  │  │                                           │
│  ├────────┤  │                                           │
│  │Knowledge│ │                                           │
│  ├────────┤  │                                           │
│  │Condition│ │                                           │
│  ├────────┤  │                                           │
│  │ Loop   │  │                                           │
│  ├────────┤  │                                           │
│  │ End    │  │                                           │
│  └────────┘  │                                           │
├──────────────┴───────────────────────────────────────────┤
│  属性面板: 选中节点的配置表单                              │
└──────────────────────────────────────────────────────────┘
```

**核心依赖**: `reactflow` (画布) + `zustand` (状态管理)

### 3.2 节点类型定义（MVP 6 种）

| 节点 | 配置项 | 后端执行 |
|------|--------|---------|
| **Start** | 输入变量定义 (JSON Schema) | 接收外部输入 |
| **LLM** | 模型选择、System/User Prompt、温度、输出格式 | DeepSeek API 调用 |
| **Code** | 语言(Python/JS)、代码内容 | Docker 沙箱执行 |
| **Knowledge** | 选择知识库、topK、相似度阈值 | PGVector 检索 |
| **Condition** | 表达式 (支持变量引用) | 运行时求值分支 |
| **End** | 输出映射 | 返回最终结果 |

### 3.3 工作流执行引擎（后端）

**新增**: `server/src/workflow/` 模块
- `workflow-engine.service.ts` — DAG 拓扑排序 + 节点调度
- `node-executor.service.ts` — 各节点类型的执行器
- `workflow.gateway.ts` — WebSocket 实时推送节点执行状态
- `workflow.controller.ts` — CRUD + 手动触发执行

**执行模型**:
```
1. 解析 DAG → 拓扑排序
2. 并发执行同层级节点
3. Condition 分支 → 决定下游激活路径
4. 状态流经节点 → WebSocket 实时推送
5. End 节点 → 聚合输出 → 返回结果
```

### 3.4 工作流与 Agent 集成
- Agent 构建器步骤中增加 "绑定工作流" 选项
- Agent 收到消息 → 触发工作流 → 工作流输出作为 Agent 回复
- 工作流可作为一种特殊的 Skill 在市场中发布

---

## Phase 4: 记忆系统（1 周）

> **目标**: Agent 能记住对话历史，提供连贯的多轮交互体验

### 4.1 短期记忆
- Redis 存储会话上下文（最近 N 轮对话）
- 每次 Agent 调用时自动注入历史消息
- 会话超时自动清理

### 4.2 长期记忆
- PGVector 存储用户偏好、关键信息
- 语义检索召回相关历史
- 用户可手动管理（查看、删除记忆条目）

### 4.3 Agent 构建器集成
- Agent 构建器步骤中增加 "启用记忆" 开关
- 配置记忆保留轮数、长期记忆开关

---

## 实施路线图

```
Week 1-2:  Phase 1 Skill Runtime
Week 3-4:  Phase 2 知识库 RAG
Week 5-7:  Phase 3 工作流引擎
Week 8:    Phase 4 记忆系统 + 整体打磨
```

## 各阶段交付物

| 阶段 | 新增页面 | 新增 API | 新增 DB 表 | 依赖 |
|------|---------|---------|-----------|------|
| P1 Skill Runtime | 1 (Skill 详情/测试) | 3 | 1 (skill_executions) | 无 |
| P2 知识库 | 2 (/knowledge, /knowledge/[id]) | 5 | 3 (知识库/文档/切片) | PGVector |
| P3 工作流 | 2 (/workflow, /workflow/[id]) | 6 | 3 (工作流/节点/执行记录) | Phase 1 |
| P4 记忆 | 0 (Agent 构建器内嵌) | 2 | 1 (记忆条目) | Phase 1 |

**总计**: 新增 5 个页面，16 个 API 端点，8 张数据库表

---

## 产品最终形态

```
AI 工具平台 v3
├── 🏠 仪表盘
├── 📋 我的项目
├── 🧩 Skill 库 (41 个)           ← v2 已有
├── 📚 知识库                      ← Phase 2 新增
├── 🔀 工作流                      ← Phase 3 新增
│   ├── 可视化编辑器
│   ├── 节点: Start/LLM/Code/Knowledge/Condition/End
│   └── 实时执行面板
├── 🔧 构建器 (5 个)               ← v2 已有，v3 增强
│   ├── App 构建器
│   ├── 小程序构建器
│   ├── Web 构建器
│   ├── Skill 编辑器  (增强: 测试运行 + 知识库绑定)
│   └── Agent 构建器  (增强: 工作流绑定 + 记忆 + 知识库)
├── 🩺 开发诊断                    ← v2 已有
├── 🏪 工具市场                    ← v2 已有
└── ⚙️ 设置                        ← v2 已有
```

## 与技术栈的兼容性

| 新增能力 | 所需依赖 | 是否冲突 |
|----------|---------|---------|
| React Flow (工作流画布) | `reactflow` | ✅ 纯前端，无冲突 |
| PGVector (向量存储) | `pgvector` extension | ✅ PostgreSQL 原生扩展 |
| MCP SDK | `@modelcontextprotocol/sdk` | ✅ TypeScript 原生 |
| DeepSeek Embedding | DeepSeek API | ✅ 已有账号即可用 |
| Docker 沙箱 | Docker Engine | ✅ ECS 自带 |

## 风险

| 风险 | 缓解 |
|------|------|
| PGVector 需要 RDS 支持 | 阿里云 RDS PG 15+ 已内置 pgvector |
| React Flow 学习曲线 | 先用简单示例，逐步复杂化 |
| 工作流引擎复杂度高 | MVP 先支持线性+条件，后续加并行/循环 |
| MCP SDK 不稳定 | 优先用 OpenAI Function Calling 格式兼容 |
