import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";

// 临时硬编码 userId — Auth 模块完成后替换为 JWT Guard
const TEMP_USER_ID = "00000000-0000-0000-0000-000000000001";

@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll(TEMP_USER_ID);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id, TEMP_USER_ID);
  }

  @Post()
  create(@Body() body: { name: string; type: string; description?: string; config?: object }) {
    return this.projectsService.create({
      name: body.name,
      type: body.type as any,
      description: body.description ?? "",
      config: body.config ?? {},
      user: {
        connect: { id: TEMP_USER_ID },
      },
    });
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() body: { name?: string; status?: string; config?: object }
  ) {
    const data: any = { ...body };
    return this.projectsService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }

  @Post(":id/publish")
  async publish(@Param("id") id: string) {
    return this.projectsService.publish(id);
  }
}
