import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import ListTasksController from "./ListTasksController";

const middleTaskCursor = "2026-11-11T09:00:00.000Z|middle-task";

const buildRepositoryWithTasks = () =>
    new InMemoryTaskRepository([
        createTestTask({ id: "oldest-task", createdAt: "2026-11-10T09:00:00.000Z" }),
        createTestTask({ id: "newest-task", createdAt: "2026-11-12T09:00:00.000Z" }),
        createTestTask({ id: "middle-task", createdAt: "2026-11-11T09:00:00.000Z" }),
    ]);

describe("ListTasksController", () => {
    it("returns tasks ordered from the newest to the oldest", () => {
        const controller = new ListTasksController(buildRepositoryWithTasks());

        const taskPage = controller.listTasks({ pageSize: 10 });

        expect(taskPage.items.map((task) => task.id)).toEqual(["newest-task", "middle-task", "oldest-task"]);
        expect(taskPage.totalTaskCount).toBe(3);
        expect(taskPage.nextCursor).toBeNull();
    });

    it("returns the first page and a cursor that describes the last task", () => {
        const controller = new ListTasksController(buildRepositoryWithTasks());

        const taskPage = controller.listTasks({ pageSize: 2 });

        expect(taskPage.items.map((task) => task.id)).toEqual(["newest-task", "middle-task"]);
        expect(taskPage.nextCursor).toBe(middleTaskCursor);
        expect(taskPage.totalTaskCount).toBe(3);
    });

    it("returns the next page from the provided cursor", () => {
        const controller = new ListTasksController(buildRepositoryWithTasks());

        const taskPage = controller.listTasks({ cursor: middleTaskCursor, pageSize: 2 });

        expect(taskPage.items.map((task) => task.id)).toEqual(["oldest-task"]);
        expect(taskPage.nextCursor).toBeNull();
    });

    it("keeps the position when the task used as the cursor was deleted", () => {
        const controller = new ListTasksController(buildRepositoryWithTasks());

        const taskPage = controller.listTasks({
            cursor: "2026-11-11T09:00:00.000Z|deleted-task",
            pageSize: 2,
        });

        expect(taskPage.items.map((task) => task.id)).toEqual(["oldest-task"]);
    });

    it("returns the first page when the cursor is malformed", () => {
        const controller = new ListTasksController(buildRepositoryWithTasks());

        const taskPage = controller.listTasks({ cursor: "malformed-cursor", pageSize: 2 });

        expect(taskPage.items.map((task) => task.id)).toEqual(["newest-task", "middle-task"]);
    });

    it("returns an empty page when the repository has no tasks", () => {
        const controller = new ListTasksController(new InMemoryTaskRepository());

        const taskPage = controller.listTasks({ pageSize: 10 });

        expect(taskPage.items).toEqual([]);
        expect(taskPage.totalTaskCount).toBe(0);
        expect(taskPage.nextCursor).toBeNull();
    });

    it("orders tasks with the same creation timestamp by identifier descending", () => {
        const repository = new InMemoryTaskRepository([
            createTestTask({ id: "task-a", createdAt: "2026-11-12T09:00:00.000Z" }),
            createTestTask({ id: "task-b", createdAt: "2026-11-12T09:00:00.000Z" }),
        ]);
        const controller = new ListTasksController(repository);

        const taskPage = controller.listTasks({ pageSize: 10 });

        expect(taskPage.items.map((task) => task.id)).toEqual(["task-b", "task-a"]);
    });
});
