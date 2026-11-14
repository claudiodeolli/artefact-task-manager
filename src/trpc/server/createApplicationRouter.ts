import CreateTaskController from "@/controllers/CreateTaskController";
import DeleteTaskController from "@/controllers/DeleteTaskController";
import GetTaskByIdController from "@/controllers/GetTaskByIdController";
import ListTasksController from "@/controllers/ListTasksController";
import ResetTasksController from "@/controllers/ResetTasksController";
import UpdateTaskController from "@/controllers/UpdateTaskController";
import type InMemoryTaskRepository from "@/repositories/InMemoryTaskRepository";
import createTaskRouter from "./createTaskRouter";
import { createTrpcRouter } from "./initializeTrpcServer";

export default function createApplicationRouter(taskRepository: InMemoryTaskRepository) {
    return createTrpcRouter({
        task: createTaskRouter({
            createTaskController: new CreateTaskController(taskRepository),
            listTasksController: new ListTasksController(taskRepository),
            getTaskByIdController: new GetTaskByIdController(taskRepository),
            updateTaskController: new UpdateTaskController(taskRepository),
            deleteTaskController: new DeleteTaskController(taskRepository),
            resetTasksController: new ResetTasksController(taskRepository),
        }),
    });
}
