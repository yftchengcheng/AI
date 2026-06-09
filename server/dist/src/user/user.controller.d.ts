import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(body: {
        email: string;
        username: string;
        password: string;
    }): Promise<any>;
    profile(id: string): any;
}
