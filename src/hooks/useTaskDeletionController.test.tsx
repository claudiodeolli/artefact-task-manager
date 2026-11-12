import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTaskDeletionController from "./useTaskDeletionController";

const deletionState = vi.hoisted(() => ({
    mutate: vi.fn(),
}));

vi.mock("./useDeleteTaskMutation", () => ({
    default: () => ({
        mutate: deletionState.mutate,
    }),
}));

type DeletionCallbacks = {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
};

describe("useTaskDeletionController", () => {
    let deletionCallbacks: DeletionCallbacks | undefined;

    beforeEach(() => {
        vi.clearAllMocks();
        deletionCallbacks = undefined;
        deletionState.mutate.mockImplementation((_input, callbacks: DeletionCallbacks) => {
            deletionCallbacks = callbacks;
        });
    });

    it("starts with the feedback message received from the page", () => {
        const { result } = renderHook(() => useTaskDeletionController("Task created successfully."));

        expect(result.current.feedbackMessage).toBe("Task created successfully.");
        expect(result.current.feedbackTone).toBe("success");
    });

    it("marks the task as deleting and reports success after the deletion", () => {
        const { result } = renderHook(() => useTaskDeletionController(null));

        act(() => {
            result.current.deleteTaskById("deletable-task");
        });

        expect(deletionState.mutate).toHaveBeenCalledWith({ taskId: "deletable-task" }, expect.any(Object));
        expect(result.current.deletingTaskId).toBe("deletable-task");

        act(() => {
            deletionCallbacks?.onSuccess?.();
        });

        expect(result.current.feedbackMessage).toBe("Task deleted successfully.");
        expect(result.current.feedbackTone).toBe("success");

        act(() => {
            deletionCallbacks?.onSettled?.();
        });

        expect(result.current.deletingTaskId).toBeNull();
    });

    it("reports a readable error when the deletion fails", () => {
        const { result } = renderHook(() => useTaskDeletionController(null));

        act(() => {
            result.current.deleteTaskById("missing-task");
        });

        act(() => {
            deletionCallbacks?.onError?.(new Error('Task with id "missing-task" was not found.'));
        });

        expect(result.current.feedbackMessage).toBe('Task with id "missing-task" was not found.');
        expect(result.current.feedbackTone).toBe("error");
    });
});
