import TaskNotFoundError from "@/errors/TaskNotFoundError";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import type { TaskIdInput } from "@/schemas/taskIdInputSchema";

export default class DeleteTaskController {
    readonly #taskRepository: InMemoryTaskRepository;

    constructor(taskRepository: InMemoryTaskRepository) {
        this.#taskRepository = taskRepository;
    }

    deleteTask({ taskId }: TaskIdInput): void {
        const task = this.#taskRepository.findTaskById(taskId);

        if (!task) {
            throw new TaskNotFoundError(taskId);
        }

        this.#taskRepository.deleteTaskById(taskId);
    }
}
