import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import DeleteTaskController from "./DeleteTaskController";

describe("DeleteTaskController", () => {
    it("deletes an existing task", () => {
        const repository = new InMemoryTaskRepository([createTestTask({ id: "deletable-task" })]);
        const controller = new DeleteTaskController(repository);

        controller.deleteTask({ taskId: "deletable-task" });

        expect(repository.findTaskById("deletable-task")).toBeUndefined();
    });

    it("throws a task not found error when the task does not exist", () => {
        const controller = new DeleteTaskController(new InMemoryTaskRepository());

        expect(() => controller.deleteTask({ taskId: "missing-task" })).toThrowError(
            'Task with id "missing-task" was not found.',
        );
    });
});
