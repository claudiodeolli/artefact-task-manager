import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import GetTaskByIdController from "./GetTaskByIdController";

describe("GetTaskByIdController", () => {
    it("returns the requested task", () => {
        const task = createTestTask({ id: "requested-task", title: "Review the media plan" });
        const controller = new GetTaskByIdController(new InMemoryTaskRepository([task]));

        expect(controller.getTaskById({ taskId: "requested-task" })).toEqual({
            id: "requested-task",
            title: "Review the media plan",
            description: "Consolidate the campaign metrics.",
            createdAt: "2026-11-12T12:00:00.000Z",
        });
    });

    it("throws a task not found error when the task does not exist", () => {
        const controller = new GetTaskByIdController(new InMemoryTaskRepository());

        expect(() => controller.getTaskById({ taskId: "missing-task" })).toThrowError(
            'Task with id "missing-task" was not found.',
        );
    });
});
