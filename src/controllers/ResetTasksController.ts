import createSeedTasks from "@/repositories/createSeedTasks";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";

export default class ResetTasksController {
    readonly #taskRepository: InMemoryTaskRepository;

    constructor(taskRepository: InMemoryTaskRepository) {
        this.#taskRepository = taskRepository;
    }

    resetTasks(): void {
        this.#taskRepository.replaceAllTasks(createSeedTasks());
    }
}
