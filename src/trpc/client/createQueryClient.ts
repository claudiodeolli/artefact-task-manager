import { QueryClient } from "@tanstack/react-query";

export default function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30_000,
                retry: 1,
            },
        },
    });
}
