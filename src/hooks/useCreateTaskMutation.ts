"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client/trpcReactContext";

export default function useCreateTaskMutation() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.task.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.task.pathFilter());
            },
        }),
    );
}
