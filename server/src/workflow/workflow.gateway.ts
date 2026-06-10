import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WorkflowEngineService } from './workflow-engine.service';

@WebSocketGateway({ namespace: '/ws/workflow', cors: { origin: '*' } })
export class WorkflowGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly engine: WorkflowEngineService) {}

  @SubscribeMessage('workflow:execute')
  async handleExecute(
    client: Socket,
    payload: {
      definition: { nodes: any[]; edges: any[] };
      input: Record<string, unknown>;
    },
  ) {
    const room = `workflow:${client.id}`;
    client.join(room);

    try {
      const { outputs, logs } = await this.engine.execute(
        payload.definition,
        payload.input,
        (nodeId, status, output) => {
          this.server
            .to(room)
            .emit('workflow:progress', { nodeId, status, output });
        },
      );

      this.server.to(room).emit('workflow:done', {
        outputs: Object.fromEntries(outputs),
        logs,
      });
    } catch (err: any) {
      this.server.to(room).emit('workflow:error', err.message);
    }
  }
}
