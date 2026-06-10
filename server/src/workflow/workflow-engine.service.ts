import { Injectable } from '@nestjs/common';
import { LlmService } from '../common/llm';
import { NodeExecutorService } from './node-executor.service';

export type WorkflowNodeType =
  | 'start'
  | 'llm'
  | 'code'
  | 'knowledge'
  | 'condition'
  | 'end';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string; // for condition: "true" | "false"
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface NodeExecutionResult {
  nodeId: string;
  output: unknown;
  error?: string;
}

/**
 * Workflow execution engine.
 *
 * Executes a DAG of nodes:
 * 1. Topological sort to determine execution order
 * 2. Execute nodes level by level (concurrent within same level)
 * 3. Condition nodes determine which downstream path activates
 * 4. Push real-time status via callbacks
 */
@Injectable()
export class WorkflowEngineService {
  constructor(private readonly nodeExecutor: NodeExecutorService) {}

  async execute(
    definition: WorkflowDefinition,
    input: Record<string, unknown>,
    onProgress?: (
      nodeId: string,
      status: 'running' | 'done' | 'error',
      output?: unknown,
    ) => void,
  ): Promise<{ outputs: Map<string, unknown>; logs: NodeExecutionResult[] }> {
    const { nodes, edges } = definition;
    const outputs = new Map<string, unknown>();
    const logs: NodeExecutionResult[] = [];

    // Build adjacency and in-degree maps
    const adjacency = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    // Also track which edge handle (for condition branching)
    const edgeMeta = new Map<string, { target: string; handle?: string }[]>();

    for (const node of nodes) {
      adjacency.set(node.id, []);
      inDegree.set(node.id, 0);
      edgeMeta.set(node.id, []);
    }

    for (const edge of edges) {
      const targets = adjacency.get(edge.source) || [];
      targets.push(edge.target);
      adjacency.set(edge.source, targets);

      const metas = edgeMeta.get(edge.source) || [];
      metas.push({ target: edge.target, handle: edge.sourceHandle });
      edgeMeta.set(edge.source, metas);

      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    }

    // Find start node
    const startNode = nodes.find((n) => n.type === 'start');
    if (!startNode) {
      throw new Error('Workflow must have a start node');
    }

    // Initialize output with input
    outputs.set(startNode.id, input);

    // Execute via BFS (topological order)
    const queue: string[] = [startNode.id];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: string[] = [];

      for (let i = 0; i < levelSize; i++) {
        const nodeId = queue.shift()!;
        if (visited.has(nodeId)) continue;
        visited.add(nodeId);
        currentLevel.push(nodeId);
      }

      // Execute current level concurrently
      const levelPromises = currentLevel.map(async (nodeId) => {
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;

        onProgress?.(nodeId, 'running');

        try {
          const nodeInput = outputs.get(nodeId) || input;
          const result = await this.nodeExecutor.execute(
            node.type,
            node.config,
            nodeInput,
            outputs,
          );

          outputs.set(nodeId, result.output ?? result);
          logs.push({ nodeId, output: result.output ?? result });
          onProgress?.(nodeId, 'done', result.output ?? result);
        } catch (err: any) {
          logs.push({ nodeId, output: null, error: err.message });
          onProgress?.(nodeId, 'error', err.message);
        }
      });

      await Promise.all(levelPromises);

      // Schedule next level, respecting condition branches
      for (const nodeId of currentLevel) {
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) continue;

        const metas = edgeMeta.get(nodeId) || [];
        const nodeOutput = outputs.get(nodeId);

        for (const { target, handle } of metas) {
          // For condition nodes, only follow the matching branch
          if (node.type === 'condition') {
            if (handle === 'true' && nodeOutput === true) {
              queue.push(target);
            } else if (handle === 'false' && nodeOutput === false) {
              queue.push(target);
            }
            // If handle doesn't match, skip this branch
          } else {
            queue.push(target);
          }

          // Pass output to downstream
          if (nodeOutput !== undefined) {
            outputs.set(target, nodeOutput);
          }
        }
      }
    }

    return { outputs, logs };
  }
}
