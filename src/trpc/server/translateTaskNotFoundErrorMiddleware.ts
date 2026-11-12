import { TRPCError } from "@trpc/server";
import findTaskNotFoundError from "./findTaskNotFoundError";
import { trpcServerMiddleware } from "./initializeTrpcServer";

const translateTaskNotFoundErrorMiddleware = trpcServerMiddleware(async ({ next }) => {
    const middlewareResult = await next();

    if (!middlewareResult.ok) {
        const taskNotFoundError = findTaskNotFoundError(middlewareResult.error);

        if (taskNotFoundError) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: taskNotFoundError.message,
                cause: taskNotFoundError,
            });
        }
    }

    return middlewareResult;
});

export default translateTaskNotFoundErrorMiddleware;
