import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useStatusQueryParameterCleanup from "./useStatusQueryParameterCleanup";

describe("useStatusQueryParameterCleanup", () => {
    afterEach(() => {
        window.history.replaceState(null, "", "/");
        vi.restoreAllMocks();
    });

    it("removes the status parameter and keeps the rest of the URL", () => {
        window.history.replaceState(null, "", "/?status=created&view=all#top");

        renderHook(() => useStatusQueryParameterCleanup());

        expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe("/?view=all#top");
    });

    it("leaves the URL untouched when there is no status parameter", () => {
        window.history.replaceState(null, "", "/?view=all");
        const replaceStateSpy = vi.spyOn(window.history, "replaceState");

        renderHook(() => useStatusQueryParameterCleanup());

        expect(replaceStateSpy).not.toHaveBeenCalled();
        expect(window.location.search).toBe("?view=all");
    });
});
