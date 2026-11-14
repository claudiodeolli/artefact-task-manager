"use client";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client/trpcReactContext";

export default function useResetDemoTasksMutation() {
    const trpc = useTRPC();

    return useMutation(trpc.task.reset.mutationOptions());
}
