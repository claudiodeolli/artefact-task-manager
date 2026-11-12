import type Task from "@/models/Task";
import type { TaskDto } from "@/models/TaskDto";

export default class TaskMapper {
    static toDto(task: Task): TaskDto {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
        };
    }
}
