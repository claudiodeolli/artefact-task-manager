import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc/server/appRouter";

export const dynamic = "force-dynamic";

const handleTrpcRequest = (request: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });

export { handleTrpcRequest as GET, handleTrpcRequest as POST };
