import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import { describe, expect, it } from "vitest";
import createApplicationRouter from "./createApplicationRouter";

const createTaskCaller = () => {
    const taskRepository = new InMemoryTaskRepository();

    return createApplicationRouter(taskRepository).createCaller({});
};

describe("task router", () => {
    it("lists tasks from an empty repository", async () => {
        const caller = createTaskCaller();

        await expect(caller.task.list({ pageSize: 10 })).resolves.toEqual({
            items: [],
            nextCursor: null,
            totalTaskCount: 0,
        });
    });

    it("creates a task and returns it in the list", async () => {
        const caller = createTaskCaller();

        const createdTask = await caller.task.create({
            title: "  Prepare the weekly analytics review  ",
            description: "  Consolidate the campaign metrics.  ",
        });

        expect(createdTask.title).toBe("Prepare the weekly analytics review");
        expect(createdTask.description).toBe("Consolidate the campaign metrics.");

        const taskPage = await caller.task.list({ pageSize: 10 });

        expect(taskPage.items).toEqual([createdTask]);
        expect(taskPage.totalTaskCount).toBe(1);
    });

    it("rejects a task without a title", async () => {
        const caller = createTaskCaller();

        await expect(caller.task.create({ title: "   " })).rejects.toMatchObject({
            code: "BAD_REQUEST",
        });
    });

    it("returns a task by its identifier", async () => {
        const caller = createTaskCaller();
        const createdTask = await caller.task.create({ title: "Review the media plan" });

        await expect(caller.task.getById({ taskId: createdTask.id })).resolves.toEqual(createdTask);
    });

    it("returns a not found error when the task does not exist", async () => {
        const caller = createTaskCaller();

        await expect(caller.task.getById({ taskId: "missing-task" })).rejects.toMatchObject({
            code: "NOT_FOUND",
            message: 'Task with id "missing-task" was not found.',
        });
    });

    it("updates an existing task", async () => {
        const caller = createTaskCaller();
        const createdTask = await caller.task.create({
            title: "Review the media plan",
            description: "Check the budget allocation.",
        });

        const updatedTask = await caller.task.update({
            taskId: createdTask.id,
            title: "Review the annual media plan",
            description: null,
        });

        expect(updatedTask).toMatchObject({
            id: createdTask.id,
            title: "Review the annual media plan",
            description: null,
            createdAt: createdTask.createdAt,
        });
    });

    it("rejects an update without any field to change", async () => {
        const caller = createTaskCaller();
        const createdTask = await caller.task.create({ title: "Review the media plan" });

        await expect(caller.task.update({ taskId: createdTask.id })).rejects.toMatchObject({
            code: "BAD_REQUEST",
        });
    });

    it("returns a not found error when updating a missing task", async () => {
        const caller = createTaskCaller();

        await expect(caller.task.update({ taskId: "missing-task", title: "Updated title" })).rejects.toMatchObject({
            code: "NOT_FOUND",
            message: 'Task with id "missing-task" was not found.',
        });
    });

    it("deletes an existing task", async () => {
        const caller = createTaskCaller();
        const createdTask = await caller.task.create({ title: "Remove the obsolete dashboard" });

        await expect(caller.task.delete({ taskId: createdTask.id })).resolves.toBeUndefined();
        await expect(caller.task.getById({ taskId: createdTask.id })).rejects.toMatchObject({ code: "NOT_FOUND" });
    });

    it("returns a not found error when deleting a missing task", async () => {
        const caller = createTaskCaller();

        await expect(caller.task.delete({ taskId: "missing-task" })).rejects.toMatchObject({
            code: "NOT_FOUND",
            message: 'Task with id "missing-task" was not found.',
        });
    });
});
