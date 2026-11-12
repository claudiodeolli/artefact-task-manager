import useTaskFormController from "@/hooks/useTaskFormController";
import type { TaskDto } from "@/models/TaskDto";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskForm from "./TaskForm";

vi.mock("@/hooks/useTaskFormController", () => ({
    default: vi.fn(),
}));

const handleTitleChange = vi.fn();
const handleDescriptionChange = vi.fn();
const handleTaskFormSubmit = vi.fn();

const initialTask: TaskDto = {
    id: "existing-task",
    title: "Review the media plan",
    description: "Check the budget allocation.",
    createdAt: "2026-11-10T10:00:00.000Z",
};

const mockTaskFormController = (overrides: Record<string, unknown> = {}) => {
    vi.mocked(useTaskFormController).mockReturnValue({
        title: "",
        description: "",
        validationMessage: null,
        submissionErrorMessage: null,
        isSubmittingTask: false,
        handleTitleChange,
        handleDescriptionChange,
        handleTaskFormSubmit,
        ...overrides,
    });
};

describe("TaskForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTaskFormController();
    });

    it("renders the creation form with empty fields", () => {
        render(<TaskForm />);

        expect(screen.getByRole("heading", { name: "Create a task" })).toBeInTheDocument();
        expect(screen.getByLabelText("Title")).toHaveValue("");
        expect(screen.getByLabelText("Description")).toHaveValue("");
        expect(screen.getByRole("button", { name: "Create task" })).toBeEnabled();
    });

    it("renders the editing form with the task values", () => {
        mockTaskFormController({ title: initialTask.title, description: initialTask.description });

        render(<TaskForm initialTask={initialTask} />);

        expect(screen.getByRole("heading", { name: "Update the task details" })).toBeInTheDocument();
        expect(screen.getByLabelText("Title")).toHaveValue("Review the media plan");
        expect(screen.getByLabelText("Description")).toHaveValue("Check the budget allocation.");
        expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
    });

    it("submits the form and forwards the field changes", () => {
        render(<TaskForm />);

        fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Plan the discovery workshop" } });
        fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Invite the client team." } });

        expect(handleTitleChange).toHaveBeenCalledTimes(1);
        expect(handleDescriptionChange).toHaveBeenCalledTimes(1);

        fireEvent.submit(screen.getByRole("button", { name: "Create task" }).closest("form") as HTMLFormElement);

        expect(handleTaskFormSubmit).toHaveBeenCalledTimes(1);
    });

    it("shows the validation message and marks the title as invalid", () => {
        mockTaskFormController({ validationMessage: "Title is required." });

        render(<TaskForm />);

        expect(screen.getByRole("alert")).toHaveTextContent("Title is required.");
        expect(screen.getByLabelText("Title")).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByLabelText("Title")).toHaveAttribute(
            "aria-describedby",
            "task-title-hint task-form-validation-message",
        );
    });

    it("shows the submission error", () => {
        mockTaskFormController({ submissionErrorMessage: "Title must contain at most 120 characters." });

        render(<TaskForm />);

        expect(screen.getByRole("alert")).toHaveTextContent("Title must contain at most 120 characters.");
    });

    it("disables the submit button while the task is being saved", () => {
        mockTaskFormController({ isSubmittingTask: true });

        render(<TaskForm />);

        expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
    });
});
