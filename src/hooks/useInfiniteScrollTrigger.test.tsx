import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useInfiniteScrollTrigger from "./useInfiniteScrollTrigger";

let intersectionObserverCallback: IntersectionObserverCallback | undefined;

class FakeIntersectionObserver {
    readonly observe = vi.fn();
    readonly disconnect = vi.fn();
    readonly unobserve = vi.fn();
    readonly takeRecords = vi.fn();

    constructor(callback: IntersectionObserverCallback) {
        intersectionObserverCallback = callback;
    }
}

type InfiniteScrollTriggerProbeProperties = {
    readonly shouldTrigger: boolean;
    readonly onTrigger: () => void;
};

function InfiniteScrollTriggerProbe({ shouldTrigger, onTrigger }: InfiniteScrollTriggerProbeProperties) {
    const sentinelElementReference = useInfiniteScrollTrigger({ shouldTrigger, onTrigger });

    return <div ref={sentinelElementReference} data-testid="scroll-sentinel" />;
}

const triggerIntersection = (isIntersecting: boolean) => {
    act(() => {
        intersectionObserverCallback?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
};

describe("useInfiniteScrollTrigger", () => {
    beforeEach(() => {
        intersectionObserverCallback = undefined;
        vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("calls the trigger function when the sentinel becomes visible", () => {
        const onTrigger = vi.fn();

        render(<InfiniteScrollTriggerProbe shouldTrigger onTrigger={onTrigger} />);

        triggerIntersection(true);

        expect(onTrigger).toHaveBeenCalledTimes(1);
    });

    it("ignores intersections that are not visible", () => {
        const onTrigger = vi.fn();

        render(<InfiniteScrollTriggerProbe shouldTrigger onTrigger={onTrigger} />);

        triggerIntersection(false);

        expect(onTrigger).not.toHaveBeenCalled();
    });

    it("does not observe the sentinel when the trigger is disabled", () => {
        const onTrigger = vi.fn();

        render(<InfiniteScrollTriggerProbe shouldTrigger={false} onTrigger={onTrigger} />);

        expect(screen.getByTestId("scroll-sentinel")).toBeInTheDocument();
        expect(intersectionObserverCallback).toBeUndefined();
    });
});
