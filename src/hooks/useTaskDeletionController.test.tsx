import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTaskDeletionController from "./useTaskDeletionController";

type PendingDeletion = {
    readonly taskId: string;
    readonly resolve: () => void;
    readonly reject: (error: unknown) => void;
};

const deletionState = vi.hoisted(() => ({
    mutateAsync: vi.fn(),
    pendingDeletions: [] as PendingDeletion[],
}));

vi.mock("./useDeleteTaskMutation", () => ({
    default: () => ({
        mutateAsync: deletionState.mutateAsync,
    }),
}));

const settleDeletion = async (taskId: string, outcome: "resolve" | "reject", error?: unknown) => {
    const pendingDeletion = deletionState.pendingDeletions.find((deletion) => deletion.taskId === taskId);

    await act(async () => {
        if (outcome === "resolve") {
            pendingDeletion?.resolve();
        } else {
            pendingDeletion?.reject(error);
        }
    });
};

describe("useTaskDeletionController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        deletionState.pendingDeletions = [];
        deletionState.mutateAsync.mockImplementation(
            ({ taskId }: { taskId: string }) =>
                new Promise<void>((resolve, reject) => {
                    deletionState.pendingDeletions.push({ taskId, resolve, reject });
                }),
        );
    });

    it("starts with the feedback message received from the page", () => {
        const { result } = renderHook(() => useTaskDeletionController("Task created successfully."));

        expect(result.current.feedbackMessage).toBe("Task created successfully.");
        expect(result.current.feedbackTone).toBe("success");
    });

    it("marks the task as deleting and reports success after the deletion", async () => {
        const { result } = renderHook(() => useTaskDeletionController(null));

        act(() => {
            void result.current.deleteTaskById("deletable-task");
        });

        expect(deletionState.mutateAsync).toHaveBeenCalledWith({ taskId: "deletable-task" });
        expect(result.current.deletingTaskIds.has("deletable-task")).toBe(true);

        await settleDeletion("deletable-task", "resolve");

        expect(result.current.feedbackMessage).toBe("Entry removed from the ledger.");
        expect(result.current.feedbackTone).toBe("success");
        expect(result.current.deletingTaskIds.size).toBe(0);
    });

    it("reports a readable error when the deletion fails", async () => {
        const { result } = renderHook(() => useTaskDeletionController(null));

        act(() => {
            void result.current.deleteTaskById("missing-task");
        });

        await settleDeletion(
            "missing-task",
            "reject",
            Object.assign(new Error('Task with id "missing-task" was not found.'), { data: { code: "NOT_FOUND" } }),
        );

        expect(result.current.feedbackMessage).toBe("This entry no longer exists. It may have been deleted.");
        expect(result.current.feedbackTone).toBe("error");
        expect(result.current.deletingTaskIds.size).toBe(0);
    });

    it("keeps every task that is still being deleted in the deleting state", async () => {
        const { result } = renderHook(() => useTaskDeletionController(null));

        act(() => {
            void result.current.deleteTaskById("first-task");
        });
        act(() => {
            void result.current.deleteTaskById("second-task");
        });

        expect([...result.current.deletingTaskIds]).toEqual(["first-task", "second-task"]);

        await settleDeletion("second-task", "resolve");

        expect([...result.current.deletingTaskIds]).toEqual(["first-task"]);

        await settleDeletion("first-task", "resolve");

        expect(result.current.deletingTaskIds.size).toBe(0);
    });

    it("ignores a second request for a task that is already being deleted", () => {
        const { result } = renderHook(() => useTaskDeletionController(null));

        act(() => {
            void result.current.deleteTaskById("first-task");
        });
        act(() => {
            void result.current.deleteTaskById("first-task");
        });

        expect(deletionState.mutateAsync).toHaveBeenCalledTimes(1);
    });
});
