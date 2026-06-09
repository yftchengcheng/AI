import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  signup(@Body() body: { email: string; username: string; password: string }) {
    return this.userService.create(body);
  }

  @Get("profile/:id")
  profile(@Param("id") id: string) {
    return this.userService.findById(id);
  }
}
