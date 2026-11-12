import sharedTaskRepository from "@/repositories/sharedTaskRepository";
import createApplicationRouter from "./createApplicationRouter";

export const appRouter = createApplicationRouter(sharedTaskRepository);

export type AppRouter = typeof appRouter;
