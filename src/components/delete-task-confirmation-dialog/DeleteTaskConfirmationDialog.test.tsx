import type { TaskDto } from "@/models/TaskDto";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteTaskConfirmationDialog from "./DeleteTaskConfirmationDialog";

const task: TaskDto = {
    id: "task-identifier",
    title: "Prepare the weekly analytics review",
    description: "Consolidate the campaign metrics.",
    createdAt: "2026-11-12T12:00:00.000Z",
};

const renderDialog = (overrides: Record<string, unknown> = {}) => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    render(
        <DeleteTaskConfirmationDialog
            task={task}
            isDeleting={false}
            onCancel={onCancel}
            onConfirm={onConfirm}
            {...overrides}
        />,
    );

    return { onCancel, onConfirm };
};

describe("DeleteTaskConfirmationDialog", () => {
    it("renders the task title and the confirmation actions", async () => {
        renderDialog();

        const dialog = await screen.findByRole("dialog");

        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(screen.getByRole("heading", { name: "Delete this entry?" })).toBeInTheDocument();
        expect(within(dialog).getByText("Prepare the weekly analytics review")).toBeInTheDocument();
        expect(within(dialog).getByRole("button", { name: "Cancel" })).toBeEnabled();
        expect(within(dialog).getByRole("button", { name: "Delete entry" })).toBeEnabled();
    });

    it("forwards the cancel and confirm actions", async () => {
        const { onCancel, onConfirm } = renderDialog();

        const dialog = await screen.findByRole("dialog");

        fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
        fireEvent.click(within(dialog).getByRole("button", { name: "Delete entry" }));

        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("disables both actions while the deletion is running", async () => {
        renderDialog({ isDeleting: true });

        const dialog = await screen.findByRole("dialog");

        expect(within(dialog).getByRole("button", { name: "Cancel" })).toBeDisabled();
        expect(within(dialog).getByRole("button", { name: "Deleting…" })).toBeDisabled();
    });

    it("renders nothing without a task", () => {
        const { container } = render(
            <DeleteTaskConfirmationDialog
                task={null}
                isDeleting={false}
                onCancel={vi.fn()}
                onConfirm={vi.fn()}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });
});
