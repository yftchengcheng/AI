import { ProjectsService } from "./projects.service";
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): any;
    findOne(id: string): any;
    create(body: {
        name: string;
        type: string;
        description?: string;
        config?: object;
    }): any;
    update(id: string, body: {
        name?: string;
        status?: string;
        config?: object;
    }): any;
    remove(id: string): any;
}
