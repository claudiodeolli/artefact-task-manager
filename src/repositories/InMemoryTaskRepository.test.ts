import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import InMemoryTaskRepository from "./InMemoryTaskRepository";

describe("InMemoryTaskRepository", () => {
    it("stores and finds all tasks", () => {
        const repository = new InMemoryTaskRepository();
        const firstTask = createTestTask({ id: "first-task" });
        const secondTask = createTestTask({ id: "second-task" });

        repository.createTask(firstTask);
        repository.createTask(secondTask);

        expect(repository.findAllTasks()).toEqual([firstTask, secondTask]);
    });

    it("starts with the provided initial tasks", () => {
        const initialTask = createTestTask({ id: "initial-task" });
        const repository = new InMemoryTaskRepository([initialTask]);

        expect(repository.findAllTasks()).toEqual([initialTask]);
    });

    it("finds a task by its identifier", () => {
        const task = createTestTask({ id: "findable-task" });
        const repository = new InMemoryTaskRepository([task]);

        expect(repository.findTaskById("findable-task")).toBe(task);
        expect(repository.findTaskById("missing-task")).toBeUndefined();
    });

    it("replaces an existing task on update", () => {
        const task = createTestTask({ id: "updatable-task", title: "Original title" });
        const updatedTask = createTestTask({ id: "updatable-task", title: "Updated title" });
        const repository = new InMemoryTaskRepository([task]);

        repository.updateTask(updatedTask);

        expect(repository.findTaskById("updatable-task")?.title).toBe("Updated title");
        expect(repository.findAllTasks()).toHaveLength(1);
    });

    it("deletes a task by its identifier", () => {
        const task = createTestTask({ id: "deletable-task" });
        const repository = new InMemoryTaskRepository([task]);

        repository.deleteTaskById("deletable-task");

        expect(repository.findTaskById("deletable-task")).toBeUndefined();
        expect(repository.findAllTasks()).toHaveLength(0);
    });

    it("keeps repositories isolated from each other", () => {
        const firstRepository = new InMemoryTaskRepository([createTestTask({ id: "first-repository-task" })]);
        const secondRepository = new InMemoryTaskRepository();

        expect(firstRepository.findAllTasks()).toHaveLength(1);
        expect(secondRepository.findAllTasks()).toHaveLength(0);
    });
});
