"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const builder_service_1 = require("./builder.service");
let BuilderGateway = class BuilderGateway {
    builderService;
    server;
    constructor(builderService) {
        this.builderService = builderService;
    }
    handleConnection(client) {
        console.log(`[WS] Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`[WS] Client disconnected: ${client.id}`);
    }
    async handleBuildStart(client, payload) {
        const room = `build:${payload.projectId}`;
        client.join(room);
        try {
            for await (const event of this.builderService.build(payload.projectId, payload.userId)) {
                this.server.to(room).emit(event.type, event.content);
            }
        }
        catch (err) {
            this.server.to(room).emit("error", err.message);
        }
    }
};
exports.BuilderGateway = BuilderGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BuilderGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("build:start"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], BuilderGateway.prototype, "handleBuildStart", null);
exports.BuilderGateway = BuilderGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: "/ws/build", cors: { origin: "*" } }),
    __metadata("design:paramtypes", [builder_service_1.BuilderService])
], BuilderGateway);
//# sourceMappingURL=builder.gateway.js.map