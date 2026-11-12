import { afterEach, describe, expect, it, vi } from "vitest";
import TaskFactory from "./TaskFactory";

describe("TaskFactory", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("creates a task with trimmed values, a generated id, and the current timestamp", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-11-12T15:45:00.000Z"));

        const task = TaskFactory.createTask({
            title: "  Review the campaign metrics  ",
            description: "  Summarise the main findings  ",
        });

        expect(task.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        expect(task.title).toBe("Review the campaign metrics");
        expect(task.description).toBe("Summarise the main findings");
        expect(task.createdAt).toBe("2026-11-12T15:45:00.000Z");
    });

    it("stores a null description when the description is missing", () => {
        const task = TaskFactory.createTask({ title: "Write the incident report" });

        expect(task.description).toBeNull();
    });

    it("stores a null description when the description contains only whitespace", () => {
        const task = TaskFactory.createTask({ title: "Write the incident report", description: "   " });

        expect(task.description).toBeNull();
    });

    it("uses the provided creation timestamp", () => {
        const task = TaskFactory.createTask({
            title: "Plan the discovery workshop",
            createdAt: "2026-11-01T09:00:00.000Z",
        });

        expect(task.createdAt).toBe("2026-11-01T09:00:00.000Z");
    });

    it("keeps the task identity and creation timestamp when creating an updated task", () => {
        const originalTask = TaskFactory.createTask({
            title: "Plan the discovery workshop",
            description: "Invite the client team.",
            createdAt: "2026-11-01T09:00:00.000Z",
        });

        const updatedTask = TaskFactory.createUpdatedTask(originalTask, {
            title: "  Plan the discovery workshop with the client  ",
        });

        expect(updatedTask.id).toBe(originalTask.id);
        expect(updatedTask.createdAt).toBe(originalTask.createdAt);
        expect(updatedTask.title).toBe("Plan the discovery workshop with the client");
        expect(updatedTask.description).toBe("Invite the client team.");
    });

    it("clears the description when the update receives an empty description", () => {
        const originalTask = TaskFactory.createTask({
            title: "Plan the discovery workshop",
            description: "Invite the client team.",
        });

        const updatedTask = TaskFactory.createUpdatedTask(originalTask, { description: "   " });

        expect(updatedTask.description).toBeNull();
    });
});
