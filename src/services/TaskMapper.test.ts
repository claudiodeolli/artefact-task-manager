import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import TaskMapper from "./TaskMapper";

describe("TaskMapper", () => {
    it("maps a task entity to a plain transport object", () => {
        const task = createTestTask({
            id: "task-identifier",
            title: "Review the customer segmentation model",
            description: "Validate the new clusters with the marketing squad.",
            createdAt: "2026-11-12T15:45:00.000Z",
        });

        expect(TaskMapper.toDto(task)).toEqual({
            id: "task-identifier",
            title: "Review the customer segmentation model",
            description: "Validate the new clusters with the marketing squad.",
            createdAt: "2026-11-12T15:45:00.000Z",
        });
    });
});
