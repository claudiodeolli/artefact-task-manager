import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import encodeTaskCursor from "./encodeTaskCursor";

describe("encodeTaskCursor", () => {
    it("encodes the creation timestamp and the identifier of the task", () => {
        const task = createTestTask({
            id: "task-identifier",
            createdAt: "2026-11-12T09:00:00.000Z",
        });

        expect(encodeTaskCursor(task)).toBe("2026-11-12T09:00:00.000Z|task-identifier");
    });
});
