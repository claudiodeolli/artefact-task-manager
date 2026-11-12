import InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import { describe, expect, it } from "vitest";
import CreateTaskController from "./CreateTaskController";

describe("CreateTaskController", () => {
    it("creates a task and returns its transport representation", () => {
        const repository = new InMemoryTaskRepository();
        const controller = new CreateTaskController(repository);

        const createdTask = controller.createTask({
            title: "  Prepare the quarterly business review  ",
            description: "  Collect the main results from each squad.  ",
        });

        expect(createdTask.title).toBe("Prepare the quarterly business review");
        expect(createdTask.description).toBe("Collect the main results from each squad.");
        expect(createdTask.id).toEqual(expect.any(String));
        expect(createdTask.createdAt).toEqual(expect.any(String));
        expect(repository.findTaskById(createdTask.id)?.title).toBe("Prepare the quarterly business review");
    });
});
