"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import createQueryClient from "./createQueryClient";
import createTrpcClient from "./createTrpcClient";
import { TRPCProvider } from "./trpcReactContext";

type ApplicationTrpcProviderProperties = {
    readonly children: ReactNode;
};

export default function ApplicationTrpcProvider({ children }: ApplicationTrpcProviderProperties) {
    const [queryClient] = useState(createQueryClient);
    const [trpcClient] = useState(createTrpcClient);

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}
