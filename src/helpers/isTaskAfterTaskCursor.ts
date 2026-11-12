import type Task from "@/models/Task";
import type { TaskCursor } from "@/models/TaskCursor";

export default function isTaskAfterTaskCursor(task: Task, taskCursor: TaskCursor): boolean {
    if (task.createdAt !== taskCursor.createdAt) {
        return task.createdAt < taskCursor.createdAt;
    }

    return task.id < taskCursor.id;
}
