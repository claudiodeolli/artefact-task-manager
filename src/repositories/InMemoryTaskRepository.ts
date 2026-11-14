import type Task from "@/models/Task";

export default class InMemoryTaskRepository {
    readonly #tasksById: Map<string, Task>;

    constructor(initialTasks: readonly Task[] = []) {
        this.#tasksById = new Map(initialTasks.map((task) => [task.id, task]));
    }

    createTask(task: Task): void {
        this.#tasksById.set(task.id, task);
    }

    findAllTasks(): Task[] {
        return Array.from(this.#tasksById.values());
    }

    findTaskById(taskId: string): Task | undefined {
        return this.#tasksById.get(taskId);
    }

    updateTask(task: Task): void {
        this.#tasksById.set(task.id, task);
    }

    deleteTaskById(taskId: string): void {
        this.#tasksById.delete(taskId);
    }

    replaceAllTasks(tasks: readonly Task[]): void {
        this.#tasksById.clear();

        for (const task of tasks) {
            this.#tasksById.set(task.id, task);
        }
    }
}
