import compareTasksByCreationDateDescending from "@/helpers/compareTasksByCreationDateDescending";
import decodeTaskCursor from "@/helpers/decodeTaskCursor";
import encodeTaskCursor from "@/helpers/encodeTaskCursor";
import findTaskIndexAfterTaskCursor from "@/helpers/findTaskIndexAfterTaskCursor";
import type { TaskListPage } from "@/models/TaskListPage";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import type { ListTasksInput } from "@/schemas/listTasksInputSchema";
import TaskMapper from "@/services/TaskMapper";

export default class ListTasksController {
    readonly #taskRepository: InMemoryTaskRepository;

    constructor(taskRepository: InMemoryTaskRepository) {
        this.#taskRepository = taskRepository;
    }

    listTasks({ cursor, pageSize }: ListTasksInput): TaskListPage {
        const sortedTasks = this.#taskRepository.findAllTasks().sort(compareTasksByCreationDateDescending);
        const taskCursor = decodeTaskCursor(cursor);
        const pageStartIndex = findTaskIndexAfterTaskCursor(sortedTasks, taskCursor);
        const pageTasks = sortedTasks.slice(pageStartIndex, pageStartIndex + pageSize);
        const hasMoreTasks = pageStartIndex + pageSize < sortedTasks.length;
        const lastTaskOfPage = pageTasks[pageTasks.length - 1];

        return {
            items: pageTasks.map((task) => TaskMapper.toDto(task)),
            nextCursor: hasMoreTasks && lastTaskOfPage ? encodeTaskCursor(lastTaskOfPage) : null,
            totalTaskCount: sortedTasks.length,
        };
    }
}
