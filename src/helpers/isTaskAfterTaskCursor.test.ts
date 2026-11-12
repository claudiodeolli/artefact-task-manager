import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import isTaskAfterTaskCursor from "./isTaskAfterTaskCursor";

describe("isTaskAfterTaskCursor", () => {
    const taskCursor = { createdAt: "2026-11-12T09:00:00.000Z", id: "task-m" };

    it("considers an older task to be after the cursor", () => {
        const olderTask = createTestTask({ id: "older-task", createdAt: "2026-11-11T09:00:00.000Z" });

        expect(isTaskAfterTaskCursor(olderTask, taskCursor)).toBe(true);
    });

    it("considers a newer task to be before the cursor", () => {
        const newerTask = createTestTask({ id: "newer-task", createdAt: "2026-11-13T09:00:00.000Z" });

        expect(isTaskAfterTaskCursor(newerTask, taskCursor)).toBe(false);
    });

    it("uses the identifier to break ties on the same timestamp", () => {
        const lowerIdentifierTask = createTestTask({ id: "task-a", createdAt: taskCursor.createdAt });
        const higherIdentifierTask = createTestTask({ id: "task-z", createdAt: taskCursor.createdAt });

        expect(isTaskAfterTaskCursor(lowerIdentifierTask, taskCursor)).toBe(true);
        expect(isTaskAfterTaskCursor(higherIdentifierTask, taskCursor)).toBe(false);
    });
});
