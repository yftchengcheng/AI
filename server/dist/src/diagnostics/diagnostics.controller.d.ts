import { Response } from "express";
import { DiagnosticsService } from "./diagnostics.service";
export declare class DiagnosticsController {
    private readonly diagnosticsService;
    constructor(diagnosticsService: DiagnosticsService);
    analyze(body: {
        type: string;
        input: string;
    }, res: Response): Promise<void>;
}
