import type CreateTaskController from "@/controllers/CreateTaskController";
import type DeleteTaskController from "@/controllers/DeleteTaskController";
import type GetTaskByIdController from "@/controllers/GetTaskByIdController";
import type ListTasksController from "@/controllers/ListTasksController";
import type ResetTasksController from "@/controllers/ResetTasksController";
import type UpdateTaskController from "@/controllers/UpdateTaskController";
import { createTaskInputSchema } from "@/schemas/createTaskInputSchema";
import { listTasksInputSchema } from "@/schemas/listTasksInputSchema";
import { taskIdInputSchema } from "@/schemas/taskIdInputSchema";
import { updateTaskInputSchema } from "@/schemas/updateTaskInputSchema";
import { createTrpcRouter } from "./initializeTrpcServer";
import { publicProcedure } from "./publicProcedure";

export type TaskRouterDependencies = {
    readonly createTaskController: CreateTaskController;
    readonly listTasksController: ListTasksController;
    readonly getTaskByIdController: GetTaskByIdController;
    readonly updateTaskController: UpdateTaskController;
    readonly deleteTaskController: DeleteTaskController;
    readonly resetTasksController: ResetTasksController;
};

export default function createTaskRouter(dependencies: TaskRouterDependencies) {
    return createTrpcRouter({
        create: publicProcedure
            .input(createTaskInputSchema)
            .mutation(({ input }) => dependencies.createTaskController.createTask(input)),
        list: publicProcedure
            .input(listTasksInputSchema)
            .query(({ input }) => dependencies.listTasksController.listTasks(input)),
        getById: publicProcedure
            .input(taskIdInputSchema)
            .query(({ input }) => dependencies.getTaskByIdController.getTaskById(input)),
        update: publicProcedure
            .input(updateTaskInputSchema)
            .mutation(({ input }) => dependencies.updateTaskController.updateTask(input)),
        delete: publicProcedure
            .input(taskIdInputSchema)
            .mutation(({ input }) => dependencies.deleteTaskController.deleteTask(input)),
        reset: publicProcedure
            .mutation(() => dependencies.resetTasksController.resetTasks()),
    });
}
