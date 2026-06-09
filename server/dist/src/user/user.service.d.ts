import { PrismaService } from "../common/prisma";
import { AuthService } from "../common/auth";
export declare class UserService {
    private readonly prisma;
    private readonly authService;
    constructor(prisma: PrismaService, authService: AuthService);
    create(data: {
        email: string;
        username: string;
        password: string;
    }): Promise<any>;
    findByEmail(email: string): any;
    findById(id: string): any;
}
