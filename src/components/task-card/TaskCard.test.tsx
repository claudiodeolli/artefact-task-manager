import type { TaskDto } from "@/models/TaskDto";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskCard from "./TaskCard";

const task: TaskDto = {
    id: "task-identifier",
    title: "Prepare the weekly analytics review",
    description: "Consolidate the campaign metrics and share the summary with the team.",
    createdAt: "2026-11-12T15:45:00.000Z",
};

describe("TaskCard", () => {
    it("renders the task details and the creation date", () => {
        render(<TaskCard task={task} isDeleting={false} onDeleteRequested={vi.fn()} />);

        expect(screen.getByRole("heading", { name: "Prepare the weekly analytics review" })).toBeInTheDocument();
        expect(screen.getByText("Consolidate the campaign metrics and share the summary with the team.")).toBeInTheDocument();
        expect(screen.getByText("2026.11.12")).toBeInTheDocument();
        expect(screen.getByText("15:45", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("2026.11.12").closest("time")).toHaveAttribute(
            "aria-label",
            "Created Nov 12, 2026, 3:45 PM UTC",
        );
        expect(screen.getByText("2026.11.12").closest("time")).toHaveAttribute(
            "datetime",
            "2026-11-12T15:45:00.000Z",
        );
        expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
            "href",
            "/tasks/task-identifier/edit",
        );
    });

    it("shows a fallback text when the task has no description", () => {
        render(<TaskCard task={{ ...task, description: null }} isDeleting={false} onDeleteRequested={vi.fn()} />);

        expect(screen.getByText("No description added.")).toBeInTheDocument();
    });

    it("requests the deletion of the task", () => {
        const onDeleteRequested = vi.fn();

        render(<TaskCard task={task} isDeleting={false} onDeleteRequested={onDeleteRequested} />);

        fireEvent.click(screen.getByRole("button", { name: "Delete" }));

        expect(onDeleteRequested).toHaveBeenCalledWith("task-identifier");
    });

    it("disables the delete button while the task is being deleted", () => {
        render(<TaskCard task={task} isDeleting onDeleteRequested={vi.fn()} />);

        expect(screen.getByRole("button", { name: "Deleting…" })).toBeDisabled();
    });
});
