import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@/trpc/server/appRouter";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
