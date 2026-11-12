export default class TaskNotFoundError extends Error {
    constructor(taskId: string) {
        super(`Task with id "${taskId}" was not found.`);
        this.name = "TaskNotFoundError";
    }
}
