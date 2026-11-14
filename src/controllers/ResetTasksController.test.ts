import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import createTestTask from "@/test-support/createTestTask";
import { describe, expect, it } from "vitest";
import ResetTasksController from "./ResetTasksController";

describe("ResetTasksController", () => {
    it("restores the seed tasks and clears existing tasks", () => {
        const repository = new InMemoryTaskRepository([
            createTestTask({ id: "temporary-task", title: "Temporary task" }),
        ]);
        const controller = new ResetTasksController(repository);

        controller.resetTasks();

        const resetTasks = repository.findAllTasks();

        expect(resetTasks).toHaveLength(3);
        expect(resetTasks.map((task) => task.title)).toEqual([
            "Prepare the weekly analytics review",
            "Review the customer segmentation model",
            "Update the onboarding documentation",
        ]);
        expect(repository.findTaskById("temporary-task")).toBeUndefined();
    });
});
