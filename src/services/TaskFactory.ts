import normalizeTaskDescription from "@/helpers/normalizeTaskDescription";
import Task from "@/models/Task";

export default class TaskFactory {
    static createTask({ title, description, createdAt = new Date().toISOString() }: {
        readonly title: string;
        readonly description?: string | null;
        readonly createdAt?: string;
    }): Task {
        return new Task({
            id: crypto.randomUUID(),
            title: title.trim(),
            description: normalizeTaskDescription(description),
            createdAt,
        });
    }

    static createUpdatedTask(existingTask: Task, changes: {
        readonly title?: string;
        readonly description?: string | null;
    }): Task {
        return new Task({
            id: existingTask.id,
            title: changes.title === undefined ? existingTask.title : changes.title.trim(),
            description: changes.description === undefined ? existingTask.description : normalizeTaskDescription(changes.description),
            createdAt: existingTask.createdAt,
        });
    }
}
