import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { BuilderService } from "./builder.service";
export declare class BuilderGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly builderService;
    server: Server;
    constructor(builderService: BuilderService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleBuildStart(client: Socket, payload: {
        projectId: string;
        userId: string;
    }): Promise<void>;
}
