import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import compareTasksByCreationDateDescending from "./compareTasksByCreationDateDescending";

describe("compareTasksByCreationDateDescending", () => {
    it("places the newest task first", () => {
        const olderTask = createTestTask({ id: "older-task", createdAt: "2026-11-10T09:00:00.000Z" });
        const newerTask = createTestTask({ id: "newer-task", createdAt: "2026-11-12T09:00:00.000Z" });

        expect(compareTasksByCreationDateDescending(newerTask, olderTask)).toBeLessThan(0);
        expect(compareTasksByCreationDateDescending(olderTask, newerTask)).toBeGreaterThan(0);
    });

    it("orders tasks with the same timestamp by identifier descending", () => {
        const firstTask = createTestTask({ id: "task-a", createdAt: "2026-11-12T09:00:00.000Z" });
        const secondTask = createTestTask({ id: "task-b", createdAt: "2026-11-12T09:00:00.000Z" });

        expect(compareTasksByCreationDateDescending(secondTask, firstTask)).toBeLessThan(0);
        expect(compareTasksByCreationDateDescending(firstTask, secondTask)).toBeGreaterThan(0);
    });
});
