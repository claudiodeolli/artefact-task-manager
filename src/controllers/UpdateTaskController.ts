import TaskNotFoundError from "@/errors/TaskNotFoundError";
import type { TaskDto } from "@/models/TaskDto";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import type { UpdateTaskInput } from "@/schemas/updateTaskInputSchema";
import TaskFactory from "@/services/TaskFactory";
import TaskMapper from "@/services/TaskMapper";

export default class UpdateTaskController {
    readonly #taskRepository: InMemoryTaskRepository;

    constructor(taskRepository: InMemoryTaskRepository) {
        this.#taskRepository = taskRepository;
    }

    updateTask({ taskId, title, description }: UpdateTaskInput): TaskDto {
        const existingTask = this.#taskRepository.findTaskById(taskId);

        if (!existingTask) {
            throw new TaskNotFoundError(taskId);
        }

        const updatedTask = TaskFactory.createUpdatedTask(existingTask, { title, description });

        this.#taskRepository.updateTask(updatedTask);

        return TaskMapper.toDto(updatedTask);
    }
}
