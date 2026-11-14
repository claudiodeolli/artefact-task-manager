import useResetDemoTasksMutation from "@/hooks/useResetDemoTasksMutation";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DemoModeNotice from "./DemoModeNotice";

vi.mock("@/hooks/useResetDemoTasksMutation", () => ({
    default: vi.fn(),
}));

const resetDemoTasks = vi.fn();

const mockResetDemoTasksMutation = (overrides: Record<string, unknown> = {}) => {
    vi.mocked(useResetDemoTasksMutation).mockReturnValue({
        mutate: resetDemoTasks,
        isPending: false,
        error: null,
        ...overrides,
    } as unknown as ReturnType<typeof useResetDemoTasksMutation>);
};

describe("DemoModeNotice", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockResetDemoTasksMutation();
    });

    it("shows the demo explanation and the reset button", () => {
        render(<DemoModeNotice />);

        expect(screen.getByText("Data lives in memory and resets when the application restarts.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Reset demo" })).toBeInTheDocument();
    });

    it("asks for confirmation before resetting", async () => {
        render(<DemoModeNotice />);

        fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));

        expect(screen.getByText("Restore the three sample entries? Current changes will be lost.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Reset demo" })).toBeInTheDocument();
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Cancel" })));
    });

    it("cancels the reset and returns to the initial state", async () => {
        render(<DemoModeNotice />);

        fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(screen.getByText("Data lives in memory and resets when the application restarts.")).toBeInTheDocument();
        await waitFor(() =>
            expect(document.activeElement).toBe(screen.getByRole("button", { name: "Reset demo" })),
        );
    });

    it("confirms the reset through the reset mutation", () => {
        render(<DemoModeNotice />);

        fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
        fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));

        expect(resetDemoTasks).toHaveBeenCalledWith(undefined, expect.objectContaining({ onSuccess: expect.any(Function) }));
    });

    it("shows the pending state while resetting", () => {
        mockResetDemoTasksMutation({ isPending: true });
        render(<DemoModeNotice />);

        fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));

        const resetButton = screen.getByRole("button", { name: "Resetting…" });

        expect(resetButton).toBeDisabled();
        expect(resetButton).toHaveAttribute("aria-busy", "true");
        expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    });

    it("shows a reset error without closing the confirmation", () => {
        mockResetDemoTasksMutation({ error: new Error("Reset failed.") });
        render(<DemoModeNotice />);

        fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));

        expect(screen.getByRole("alert")).toHaveTextContent("Reset failed.");
        expect(screen.getByRole("button", { name: "Reset demo" })).toBeInTheDocument();
    });
});
