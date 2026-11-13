"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client/trpcReactContext";

export default function useUpdateTaskMutation() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.task.update.mutationOptions({
            onSuccess: () => {
                queryClient.removeQueries(trpc.task.pathFilter());
            },
        }),
    );
}
