import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ApplicationHeader from "./ApplicationHeader";

vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
}));

describe("ApplicationHeader", () => {
    beforeEach(() => {
        vi.mocked(usePathname).mockReturnValue("/");
    });

    it("renders the brand and the prominent new task action", () => {
        render(<ApplicationHeader />);

        expect(screen.getByRole("link", { name: "Task Manager home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "New task" })).toHaveAttribute("href", "/tasks/new");
        expect(screen.getByText("Work ledger / Vol. 01")).toBeInTheDocument();
    });

    it("hides the new task action on the creation form", () => {
        vi.mocked(usePathname).mockReturnValue("/tasks/new");

        render(<ApplicationHeader />);

        expect(screen.queryByRole("link", { name: "New task" })).not.toBeInTheDocument();
    });

    it("hides the new task action on the edit form", () => {
        vi.mocked(usePathname).mockReturnValue("/tasks/existing-task/edit");

        render(<ApplicationHeader />);

        expect(screen.queryByRole("link", { name: "New task" })).not.toBeInTheDocument();
    });
});
