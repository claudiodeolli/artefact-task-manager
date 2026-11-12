import type Task from "@/models/Task";

export default function compareTasksByCreationDateDescending(firstTask: Task, secondTask: Task): number {
    if (firstTask.createdAt === secondTask.createdAt) {
        return secondTask.id.localeCompare(firstTask.id);
    }

    return secondTask.createdAt.localeCompare(firstTask.createdAt);
}
