import type Task from "@/models/Task";

export default function encodeTaskCursor(task: Task): string {
    return `${task.createdAt}|${task.id}`;
}
