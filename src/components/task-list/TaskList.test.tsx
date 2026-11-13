import useInfiniteScrollTrigger from "@/hooks/useInfiniteScrollTrigger";
import useTaskDeletionController from "@/hooks/useTaskDeletionController";
import useTaskListInfiniteQuery from "@/hooks/useTaskListInfiniteQuery";
import type { TaskListPage } from "@/models/TaskListPage";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskList from "./TaskList";

vi.mock("@/hooks/useTaskListInfiniteQuery", () => ({
    default: vi.fn(),
}));

vi.mock("@/hooks/useTaskDeletionController", () => ({
    default: vi.fn(),
}));

vi.mock("@/hooks/useInfiniteScrollTrigger", () => ({
    default: vi.fn(),
}));

const initialTaskPage: TaskListPage = {
    items: [
        {
            id: "first-task",
            title: "Prepare the weekly analytics review",
            description: "Consolidate the campaign metrics.",
            createdAt: "2026-11-12T12:00:00.000Z",
        },
        {
            id: "second-task",
            title: "Review the customer segmentation model",
            description: null,
            createdAt: "2026-11-11T12:00:00.000Z",
        },
    ],
    nextCursor: null,
    totalTaskCount: 2,
};

const deleteTaskById = vi.fn().mockResolvedValue(true);
const retryTaskListLoading = vi.fn();
const loadMoreTasks = vi.fn();

const mockTaskListQuery = (overrides: Record<string, unknown> = {}) => {
    vi.mocked(useTaskListInfiniteQuery).mockReturnValue({
        taskDtoList: [...initialTaskPage.items],
        totalTaskCount: 2,
        isInitialLoading: false,
        isLoadingMoreTasks: false,
        hasMoreTasks: false,
        isRetryingTaskListLoading: false,
        taskListErrorMessage: null,
        loadMoreTasks,
        retryTaskListLoading,
        ...overrides,
    });
};

const mockTaskDeletion = (overrides: Record<string, unknown> = {}) => {
    vi.mocked(useTaskDeletionController).mockReturnValue({
        feedbackMessage: null,
        feedbackTone: "success",
        deletingTaskIds: new Set<string>(),
        deleteTaskById,
        ...overrides,
    });
};

describe("TaskList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTaskListQuery();
        mockTaskDeletion();
        vi.mocked(useInfiniteScrollTrigger).mockReturnValue({ current: null });
    });

    it("renders the tasks and the list summary", () => {
        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByRole("heading", { name: "Tasks, in order." })).toBeInTheDocument();
        expect(screen.getByLabelText("2 entries in the ledger")).toBeInTheDocument();
        expect(screen.getByText("2 shown")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Prepare the weekly analytics review" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Review the customer segmentation model" })).toBeInTheDocument();
    });

    it("uses the singular entry label for one task", () => {
        mockTaskListQuery({
            taskDtoList: [initialTaskPage.items[0]],
            totalTaskCount: 1,
        });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByLabelText("1 entry in the ledger")).toBeInTheDocument();
        expect(screen.getByText("entry")).toBeInTheDocument();
        expect(screen.getByText("1 shown")).toBeInTheDocument();
    });

    it("renders the empty state when there are no tasks", () => {
        mockTaskListQuery({ taskDtoList: [], totalTaskCount: 0 });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByRole("heading", { name: "The ledger is empty." })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Add the first task" })).toHaveAttribute(
            "href",
            "/tasks/new",
        );
    });

    it("renders the feedback message received from the page", () => {
        mockTaskDeletion({ feedbackMessage: "Entry added to the ledger." });

        render(
            <TaskList
                initialTaskPage={initialTaskPage}
                initialFeedbackMessage="Entry added to the ledger."
            />,
        );

        expect(useTaskDeletionController).toHaveBeenCalledWith("Entry added to the ledger.");
        expect(screen.getByRole("status")).toHaveTextContent("Entry added to the ledger.");
    });

    it("renders the list error and retries the loading", () => {
        mockTaskListQuery({ taskListErrorMessage: "The ledger could not be loaded." });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByRole("alert")).toHaveTextContent("The ledger could not be loaded.");

        fireEvent.click(screen.getByRole("button", { name: "Try again" }));

        expect(retryTaskListLoading).toHaveBeenCalledTimes(1);
    });

    it("shows the retry state while the list is loading again", () => {
        mockTaskListQuery({
            taskListErrorMessage: "The ledger could not be loaded.",
            isRetryingTaskListLoading: true,
        });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        const retryButton = screen.getByRole("button", { name: "Trying again…" });

        expect(retryButton).toBeDisabled();
        expect(retryButton).toHaveAttribute("aria-busy", "true");
    });

    it("asks for confirmation before deleting a task", async () => {
        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        fireEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

        const dialog = await screen.findByRole("dialog");

        expect(within(dialog).getByText("Prepare the weekly analytics review")).toBeInTheDocument();
        expect(deleteTaskById).not.toHaveBeenCalled();

        fireEvent.click(within(dialog).getByRole("button", { name: "Delete entry" }));

        await waitFor(() => {
            expect(deleteTaskById).toHaveBeenCalledWith("first-task");
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    it("keeps the task when the deletion is cancelled", async () => {
        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        fireEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

        const dialog = await screen.findByRole("dialog");

        fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
        expect(deleteTaskById).not.toHaveBeenCalled();
    });

    it("shows the deletion state of the task being removed", () => {
        mockTaskDeletion({ deletingTaskIds: new Set(["first-task"]) });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByRole("button", { name: "Deleting…" })).toBeDisabled();
    });

    it("offers a manual load more action for the next page", () => {
        mockTaskListQuery({ hasMoreTasks: true });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        fireEvent.click(screen.getByRole("button", { name: "Load more entries" }));

        expect(loadMoreTasks).toHaveBeenCalledTimes(1);
    });

    it("shows the incremental loading message", () => {
        mockTaskListQuery({ isLoadingMoreTasks: true });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading entries…");
    });

    it("shows the initial loading message while the list is loading", () => {
        mockTaskListQuery({ isInitialLoading: true, taskDtoList: [], totalTaskCount: 0 });

        render(<TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={null} />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading entries…");
    });
});
