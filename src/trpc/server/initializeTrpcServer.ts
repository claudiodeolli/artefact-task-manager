import { initTRPC } from "@trpc/server";
import buildTrpcErrorShapeWithValidationMessage from "./buildTrpcErrorShapeWithValidationMessage";

const trpcServer = initTRPC.create({
    errorFormatter: ({ shape, error }) => buildTrpcErrorShapeWithValidationMessage(shape, error),
});

export const createTrpcRouter = trpcServer.router;
export const trpcServerProcedure = trpcServer.procedure;
export const trpcServerMiddleware = trpcServer.middleware;
