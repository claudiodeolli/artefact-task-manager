"use client";

import { useEffect, useRef } from "react";

type InfiniteScrollTriggerOptions = {
    readonly shouldTrigger: boolean;
    readonly onTrigger: () => void;
};

export default function useInfiniteScrollTrigger({ shouldTrigger, onTrigger }: InfiniteScrollTriggerOptions) {
    const sentinelElementReference = useRef<HTMLDivElement | null>(null);
    const onTriggerReference = useRef(onTrigger);

    useEffect(() => {
        onTriggerReference.current = onTrigger;
    }, [onTrigger]);

    useEffect(() => {
        const sentinelElement = sentinelElementReference.current;

        if (!shouldTrigger || !sentinelElement) {
            return undefined;
        }

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    onTriggerReference.current();
                }
            },
            { rootMargin: "240px" },
        );

        intersectionObserver.observe(sentinelElement);

        return () => {
            intersectionObserver.disconnect();
        };
    }, [shouldTrigger]);

    return sentinelElementReference;
}
