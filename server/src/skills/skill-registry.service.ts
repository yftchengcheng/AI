import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma";

/**
 * Skill registry — manages runtime state of all 41 built-in skills
 * and tracks what's loaded, active, or in error state.
 */
@Injectable()
export class SkillRegistryService {
  private activeSkills = new Map<string, { loadedAt: Date; status: "loaded" | "error"; error?: string }>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Load all skills into the runtime registry.
   * Called on server startup.
   */
  async loadAll(): Promise<number> {
    const skills = await this.prisma.project.findMany({
      where: { type: "skill" },
    });

    let count = 0;
    for (const skill of skills) {
      try {
        this.activeSkills.set(skill.id, { loadedAt: new Date(), status: "loaded" });
        count++;
      } catch (err: any) {
        this.activeSkills.set(skill.id, {
          loadedAt: new Date(),
          status: "error",
          error: err.message,
        });
      }
    }
    return count;
  }

  /** Check if a skill is loaded and ready */
  isReady(skillId: string): boolean {
    return this.activeSkills.get(skillId)?.status === "loaded";
  }

  /** Get all loaded skill IDs */
  getLoaded(): string[] {
    return Array.from(this.activeSkills.entries())
      .filter(([_, state]) => state.status === "loaded")
      .map(([id]) => id);
  }

  /** Get registry status for monitoring */
  getStatus(): { total: number; loaded: number; errors: number } {
    const entries = Array.from(this.activeSkills.values());
    return {
      total: entries.length,
      loaded: entries.filter(e => e.status === "loaded").length,
      errors: entries.filter(e => e.status === "error").length,
    };
  }
}
