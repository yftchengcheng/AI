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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../common/prisma");
const auth_1 = require("../common/auth");
let UserService = class UserService {
    prisma;
    authService;
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async create(data) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing) {
            throw new common_1.ConflictException("邮箱已被注册");
        }
        const hashedPassword = await this.authService.hash(data.password);
        return this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                username: true,
                avatarUrl: true,
                createdAt: true,
            },
        });
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                avatarUrl: true,
                createdAt: true,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        auth_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map