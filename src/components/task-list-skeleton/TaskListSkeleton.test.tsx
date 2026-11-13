import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TaskListSkeleton from "./TaskListSkeleton";

describe("TaskListSkeleton", () => {
    it("announces the loading of the entries", () => {
        render(<TaskListSkeleton />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading entries…");
    });

    it("renders the requested number of placeholder entries", () => {
        const { container } = render(<TaskListSkeleton entryCount={3} />);

        expect(container.querySelectorAll("li")).toHaveLength(3);
    });

    it("renders the real list intro when the header is requested", () => {
        render(<TaskListSkeleton shouldShowHeader />);

        expect(screen.getByRole("heading", { name: "Tasks, in order." })).toBeInTheDocument();
    });

    it("does not render interactive controls", () => {
        render(<TaskListSkeleton shouldShowHeader />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
});
