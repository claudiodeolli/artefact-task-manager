import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/trpc/server/appRouter";

export default function createTrpcClient() {
    return createTRPCClient<AppRouter>({
        links: [
            httpBatchLink({
                url: "/api/trpc",
            }),
        ],
    });
}
