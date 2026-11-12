import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import findTaskIndexAfterTaskCursor from "./findTaskIndexAfterTaskCursor";

describe("findTaskIndexAfterTaskCursor", () => {
    const tasks = [
        createTestTask({ id: "newest-task", createdAt: "2026-11-12T09:00:00.000Z" }),
        createTestTask({ id: "middle-task", createdAt: "2026-11-11T09:00:00.000Z" }),
        createTestTask({ id: "oldest-task", createdAt: "2026-11-10T09:00:00.000Z" }),
    ];

    it("starts at the first position when no cursor is provided", () => {
        expect(findTaskIndexAfterTaskCursor(tasks, null)).toBe(0);
    });

    it("returns the position of the first task after the cursor", () => {
        expect(
            findTaskIndexAfterTaskCursor(tasks, {
                createdAt: "2026-11-11T09:00:00.000Z",
                id: "middle-task",
            }),
        ).toBe(2);
    });

    it("returns the end position when every task is before the cursor", () => {
        expect(
            findTaskIndexAfterTaskCursor(tasks, {
                createdAt: "2026-11-09T09:00:00.000Z",
                id: "old-task",
            }),
        ).toBe(3);
    });

    it("keeps the position when the cursor task was deleted", () => {
        expect(
            findTaskIndexAfterTaskCursor(tasks, {
                createdAt: "2026-11-11T09:00:00.000Z",
                id: "deleted-task",
            }),
        ).toBe(2);
    });
});
