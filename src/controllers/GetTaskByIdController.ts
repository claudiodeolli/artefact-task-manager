import TaskNotFoundError from "@/errors/TaskNotFoundError";
import type { TaskDto } from "@/models/TaskDto";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import type { TaskIdInput } from "@/schemas/taskIdInputSchema";
import TaskMapper from "@/services/TaskMapper";

export default class GetTaskByIdController {
    readonly #taskRepository: InMemoryTaskRepository;

    constructor(taskRepository: InMemoryTaskRepository) {
        this.#taskRepository = taskRepository;
    }

    getTaskById({ taskId }: TaskIdInput): TaskDto {
        const task = this.#taskRepository.findTaskById(taskId);

        if (!task) {
            throw new TaskNotFoundError(taskId);
        }

        return TaskMapper.toDto(task);
    }
}
