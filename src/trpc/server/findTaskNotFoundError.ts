import TaskNotFoundError from "@/errors/TaskNotFoundError";
import { TRPCError } from "@trpc/server";

export default function findTaskNotFoundError(error: unknown): TaskNotFoundError | null {
    if (error instanceof TaskNotFoundError) {
        return error;
    }

    if (error instanceof TRPCError && error.cause instanceof TaskNotFoundError) {
        return error.cause;
    }

    return null;
}
