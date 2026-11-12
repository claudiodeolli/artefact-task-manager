import isTaskAfterTaskCursor from "@/helpers/isTaskAfterTaskCursor";
import type Task from "@/models/Task";
import type { TaskCursor } from "@/models/TaskCursor";

export default function findTaskIndexAfterTaskCursor(
    tasks: readonly Task[],
    taskCursor: TaskCursor | null,
): number {
    if (!taskCursor) {
        return 0;
    }

    const taskIndex = tasks.findIndex((task) => isTaskAfterTaskCursor(task, taskCursor));

    return taskIndex === -1 ? tasks.length : taskIndex;
}
