"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Play, Plus, Trash2, ArrowRight,
  Zap, Braces, Code2, GitBranch, Circle,
  Loader2, CheckCircle2, XCircle, Clock,
} from "lucide-react";
import { api } from "@/lib/api";

interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  config: Record<string, unknown>;
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
}

const nodeTypes = [
  { type: "start", label: "Start", icon: Play, color: "bg-muted text-muted-foreground" },
  { type: "llm", label: "LLM", icon: Zap, color: "bg-muted text-muted-foreground" },
  { type: "code", label: "代码", icon: Code2, color: "bg-muted text-muted-foreground" },
  { type: "condition", label: "条件", icon: GitBranch, color: "bg-muted text-muted-foreground" },
  { type: "end", label: "End", icon: Circle, color: "bg-muted text-muted-foreground" },
];

let nodeCounter = 0;
const newNodeId = () => `node_${++nodeCounter}`;

export default function WorkflowPage() {
  const router = useRouter();
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: "start", type: "start", label: "Start", config: {} },
  ]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>("start");
  const [executing, setExecuting] = useState(false);
  const [execLog, setExecLog] = useState<{ nodeId: string; status: string; output?: string }[]>([]);
  const [finalOutput, setFinalOutput] = useState<string | null>(null);
  const [workflowInput, setWorkflowInput] = useState("");

  const selected = useMemo(() => nodes.find(n => n.id === selectedNode), [nodes, selectedNode]);

  const addNode = (type: string) => {
    const id = newNodeId();
    const def = nodeTypes.find(t => t.type === type);
    setNodes(prev => [...prev, { id, type, label: def?.label || type, config: {} }]);
    setSelectedNode(id);
  };

  const addEdge = () => {
    if (!selectedNode) return;
    const idx = nodes.findIndex(n => n.id === selectedNode);
    if (idx < 0 || idx >= nodes.length - 1) return;
    const nextNode = nodes[idx + 1];
    if (!nextNode) return;
    const edgeId = `e_${selectedNode}_${nextNode.id}`;
    if (edges.find(e => e.id === edgeId)) return;

    if (selected?.type === "condition") {
      setEdges(prev => [
        ...prev.filter(e => e.source !== selectedNode || e.target !== nextNode.id),
        { id: `${edgeId}_true`, source: selectedNode, target: nextNode.id, sourceHandle: "true" },
        { id: `${edgeId}_false`, source: selectedNode, target: nextNode.id, sourceHandle: "false" },
      ]);
    } else {
      setEdges(prev => [
        ...prev.filter(e => e.source !== selectedNode),
        { id: edgeId, source: selectedNode, target: nextNode.id },
      ]);
    }
  };

  const removeNode = (id: string) => {
    if (id === "start") return;
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.source !== id && e.target !== id));
    if (selectedNode === id) setSelectedNode("start");
  };

  const updateConfig = (key: string, value: string) => {
    setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, config: { ...n.config, [key]: value } } : n));
  };

  const handleExecute = async () => {
    setExecuting(true);
    setExecLog([]);
    setFinalOutput(null);

    try {
      const body = {
        definition: {
          nodes: nodes.map(n => ({ id: n.id, type: n.type, config: n.config, position: { x: 0, y: 0 } })),
          edges,
        },
        input: { text: workflowInput || "Hello from workflow" },
      };
      const result: any = await api.post("/api/workflows/execute", body);

      setExecLog(
        (result.logs || []).map((l: any) => ({
          nodeId: l.nodeId,
          status: l.error ? "error" : "done",
          output: l.error ? l.error : typeof l.output === "string" ? l.output : JSON.stringify(l.output),
        }))
      );

      const endNode = nodes.find(n => n.type === "end");
      if (endNode && result.outputs?.[endNode.id]) {
        setFinalOutput(typeof result.outputs[endNode.id] === "string"
          ? result.outputs[endNode.id]
          : JSON.stringify(result.outputs[endNode.id], null, 2));
      }
    } catch (err: any) {
      setExecLog([{ nodeId: "error", status: "error", output: err.message }]);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">工作流编辑器</h1>
            <p className="text-sm text-muted-foreground mt-1">可视化编排 AI 工作流 — 添加节点、配置参数、执行</p>
          </div>
          <Button size="sm" onClick={handleExecute} disabled={executing}>
            {executing ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Play size={14} className="mr-1.5" />}
            运行工作流
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Node Palette */}
          <Card className="p-4 space-y-2">
            <h3 className="text-sm font-medium mb-1">节点类型</h3>
            {nodeTypes.map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.type}
                  onClick={() => addNode(t.type)}
                  className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-left text-sm bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                  <Plus size={12} className="ml-auto opacity-50" />
                </button>
              );
            })}
          </Card>

          {/* Node List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="输入测试文本..."
                value={workflowInput}
                onChange={e => setWorkflowInput(e.target.value)}
                className="flex-1 text-sm"
              />
            </div>
            {nodes.map((node, i) => {
              const Icon = nodeTypes.find(t => t.type === node.type)?.icon || Circle;
              const isSelected = selectedNode === node.id;
              const log = execLog.find(l => l.nodeId === node.id);

              return (
                <div key={node.id}>
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected ? "border-primary/50 bg-muted/30" : "hover:border-muted-foreground/30"
                    }`}
                    onClick={() => setSelectedNode(node.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{node.label}</p>
                        <p className="text-xs text-muted-foreground">{node.type}</p>
                      </div>
                      {log && (
                        log.status === "done" ? <CheckCircle2 size={16} className="text-green-500" />
                        : log.status === "error" ? <XCircle size={16} className="text-destructive" />
                        : null
                      )}
                      {node.type !== "start" && (
                        <button onClick={e => { e.stopPropagation(); removeNode(node.id); }}>
                          <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                        </button>
                      )}
                    </div>
                  </Card>
                  {i < nodes.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowRight size={16} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              );
            })}
            <Button variant="outline" size="sm" className="w-full" onClick={addEdge}>
              <Plus size={14} className="mr-1.5" /> 连接当前节点到下一节点
            </Button>
          </div>

          {/* Config Panel */}
          <Card className="p-4 space-y-3">
            {selected ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{selected.label}</h3>
                  <Badge variant="secondary" className="text-xs">{selected.type}</Badge>
                </div>
                <Separator />

                {selected.type === "llm" && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium">System Prompt</label>
                    <textarea
                      placeholder="You are a helpful assistant."
                      value={String(selected.config.systemPrompt || "")}
                      onChange={e => updateConfig("systemPrompt", e.target.value)}
                      rows={2}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                    />
                    <label className="text-xs font-medium">User Prompt</label>
                    <textarea
                      placeholder="用户提示词..."
                      value={String(selected.config.userPrompt || "")}
                      onChange={e => updateConfig("userPrompt", e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                    />
                  </div>
                )}

                {selected.type === "code" && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium">JavaScript Code</label>
                    <textarea
                      placeholder="return 'Hello World';"
                      value={String(selected.config.code || "")}
                      onChange={e => updateConfig("code", e.target.value)}
                      rows={5}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-mono"
                    />
                  </div>
                )}

                {selected.type === "condition" && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium">条件表达式</label>
                    <Input
                      placeholder="input.text.length > 0"
                      value={String(selected.config.expression || "")}
                      onChange={e => updateConfig("expression", e.target.value)}
                      className="text-xs"
                    />
                  </div>
                )}

                {selected.type === "start" && (
                  <p className="text-xs text-muted-foreground">接收外部输入，传递给下游节点。</p>
                )}
                {selected.type === "end" && (
                  <p className="text-xs text-muted-foreground">返回上游节点输出作为最终结果。</p>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">选择节点以配置参数</p>
            )}
          </Card>
        </div>

        {/* Result */}
        {finalOutput && (
          <Card className="p-4 border-primary/20">
            <h3 className="text-sm font-medium flex items-center gap-1.5 mb-2">
              <CheckCircle2 size={14} className="text-green-500" /> 执行结果
            </h3>
            <pre className="text-xs whitespace-pre-wrap bg-muted rounded-lg p-3 max-h-64 overflow-auto">
              {finalOutput}
            </pre>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
