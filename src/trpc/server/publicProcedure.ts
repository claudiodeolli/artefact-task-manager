import translateTaskNotFoundErrorMiddleware from "./translateTaskNotFoundErrorMiddleware";
import { trpcServerProcedure } from "./initializeTrpcServer";

export const publicProcedure = trpcServerProcedure.use(translateTaskNotFoundErrorMiddleware);
