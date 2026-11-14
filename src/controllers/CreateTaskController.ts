import type { TaskDto } from "@/models/TaskDto";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import type { CreateTaskInput } from "@/schemas/createTaskInputSchema";
import TaskFactory from "@/services/TaskFactory";
import TaskMapper from "@/services/TaskMapper";

export default class CreateTaskController {
    // Mesmo padrão private aplicado para relembrar antigas convensões de javascript,
    // muito inspirado no livro "Cangaceiro javascript do professor Flávio Almeida",
    // feito apenas como recordação.
    readonly #taskRepository: InMemoryTaskRepository;

    constructor(taskRepository: InMemoryTaskRepository) {
        this.#taskRepository = taskRepository;
    }

    createTask(input: CreateTaskInput): TaskDto {
        const task = TaskFactory.createTask({
            title: input.title,
            description: input.description,
        });

        this.#taskRepository.createTask(task);

        return TaskMapper.toDto(task);
    }
}
