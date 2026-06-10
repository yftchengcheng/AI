import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BuilderService } from './builder.service';

@WebSocketGateway({ namespace: '/ws/build', cors: { origin: '*' } })
export class BuilderGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly builderService: BuilderService) {}

  handleConnection(client: Socket) {
    console.log(`[WS] Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[WS] Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('build:start')
  async handleBuildStart(
    client: Socket,
    payload: { projectId: string; userId: string },
  ) {
    const room = `build:${payload.projectId}`;
    client.join(room);

    try {
      for await (const event of this.builderService.build(
        payload.projectId,
        payload.userId,
      )) {
        this.server.to(room).emit(event.type, event.content);
      }
    } catch (err: any) {
      this.server.to(room).emit('error', err.message);
    }
  }
}
