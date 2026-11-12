import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import UpdateTaskController from "./UpdateTaskController";

describe("UpdateTaskController", () => {
    it("updates the provided fields and preserves the task identity", () => {
        const originalTask = createTestTask({
            id: "updatable-task",
            title: "Original title",
            description: "Original description",
            createdAt: "2026-11-10T10:00:00.000Z",
        });
        const repository = new InMemoryTaskRepository([originalTask]);
        const controller = new UpdateTaskController(repository);

        const updatedTask = controller.updateTask({
            taskId: "updatable-task",
            title: "  Updated title  ",
        });

        expect(updatedTask.id).toBe("updatable-task");
        expect(updatedTask.createdAt).toBe("2026-11-10T10:00:00.000Z");
        expect(updatedTask.title).toBe("Updated title");
        expect(updatedTask.description).toBe("Original description");
        expect(repository.findTaskById("updatable-task")?.title).toBe("Updated title");
    });

    it("clears the description when null is provided", () => {
        const repository = new InMemoryTaskRepository([
            createTestTask({ id: "task-with-description", description: "Remove this description" }),
        ]);
        const controller = new UpdateTaskController(repository);

        const updatedTask = controller.updateTask({ taskId: "task-with-description", description: null });

        expect(updatedTask.description).toBeNull();
    });

    it("throws a task not found error when the task does not exist", () => {
        const controller = new UpdateTaskController(new InMemoryTaskRepository());

        expect(() => controller.updateTask({ taskId: "missing-task", title: "Updated title" })).toThrowError(
            'Task with id "missing-task" was not found.',
        );
    });
});
