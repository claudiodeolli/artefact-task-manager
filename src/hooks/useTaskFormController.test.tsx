import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent, FormEvent } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTaskFormController from "./useTaskFormController";

const routerMock = vi.hoisted(() => ({
    push: vi.fn(),
}));

const mutationState = vi.hoisted(() => ({
    createMutate: vi.fn(),
    createReset: vi.fn(),
    createIsPending: false,
    createError: null as Error | null,
    updateMutate: vi.fn(),
    updateReset: vi.fn(),
    updateIsPending: false,
    updateError: null as Error | null,
}));

vi.mock("next/navigation", () => ({
    useRouter: () => routerMock,
}));

vi.mock("./useCreateTaskMutation", () => ({
    default: () => ({
        mutate: mutationState.createMutate,
        reset: mutationState.createReset,
        isPending: mutationState.createIsPending,
        error: mutationState.createError,
    }),
}));

vi.mock("./useUpdateTaskMutation", () => ({
    default: () => ({
        mutate: mutationState.updateMutate,
        reset: mutationState.updateReset,
        isPending: mutationState.updateIsPending,
        error: mutationState.updateError,
    }),
}));

const createSubmitEvent = () =>
    ({
        preventDefault: vi.fn(),
    }) as unknown as FormEvent<HTMLFormElement>;

const createChangeEvent = (value: string) =>
    ({
        target: { value },
    }) as unknown as ChangeEvent<HTMLInputElement>;

const initialTask = {
    id: "existing-task",
    title: "Review the media plan",
    description: "Check the budget allocation.",
    createdAt: "2026-11-10T10:00:00.000Z",
};

describe("useTaskFormController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mutationState.createIsPending = false;
        mutationState.createError = null;
        mutationState.updateIsPending = false;
        mutationState.updateError = null;
        mutationState.createMutate.mockImplementation((_input, options) => options?.onSuccess?.());
        mutationState.updateMutate.mockImplementation((_input, options) => options?.onSuccess?.());
    });

    it("blocks the submission and shows a validation message when the title is empty", () => {
        const { result } = renderHook(() => useTaskFormController());

        act(() => {
            result.current.handleTaskFormSubmit(createSubmitEvent());
        });

        expect(result.current.validationMessage).toBe("Title is required.");
        expect(mutationState.createMutate).not.toHaveBeenCalled();
    });

    it("creates a task with trimmed values and redirects to the task list", () => {
        const { result } = renderHook(() => useTaskFormController());

        act(() => {
            result.current.handleTitleChange(createChangeEvent("  Prepare the weekly analytics review  "));
            result.current.handleDescriptionChange(
                { target: { value: "  Consolidate the campaign metrics.  " } } as ChangeEvent<HTMLTextAreaElement>,
            );
        });

        act(() => {
            result.current.handleTaskFormSubmit(createSubmitEvent());
        });

        expect(mutationState.createMutate).toHaveBeenCalledWith(
            {
                title: "Prepare the weekly analytics review",
                description: "Consolidate the campaign metrics.",
            },
            expect.objectContaining({ onSuccess: expect.any(Function) }),
        );
        expect(routerMock.push).toHaveBeenCalledWith("/?status=created");
    });

    it("updates the existing task and redirects with the updated status", () => {
        const { result } = renderHook(() => useTaskFormController(initialTask));

        act(() => {
            result.current.handleTitleChange(createChangeEvent("Review the annual media plan"));
        });

        act(() => {
            result.current.handleTaskFormSubmit(createSubmitEvent());
        });

        expect(mutationState.updateMutate).toHaveBeenCalledWith(
            {
                taskId: "existing-task",
                title: "Review the annual media plan",
                description: "Check the budget allocation.",
            },
            expect.objectContaining({ onSuccess: expect.any(Function) }),
        );
        expect(routerMock.push).toHaveBeenCalledWith("/?status=updated");
    });

    it("clears the validation message when the title changes", () => {
        const { result } = renderHook(() => useTaskFormController());

        act(() => {
            result.current.handleTaskFormSubmit(createSubmitEvent());
        });

        expect(result.current.validationMessage).toBe("Title is required.");

        act(() => {
            result.current.handleTitleChange(createChangeEvent("Plan the discovery workshop"));
        });

        expect(result.current.validationMessage).toBeNull();
    });

    it("exposes a readable submission error returned by the mutation", () => {
        mutationState.createError = Object.assign(new Error("Raw validation payload"), {
            data: { validationMessage: "Title must contain at most 120 characters." },
        });

        const { result } = renderHook(() => useTaskFormController());

        expect(result.current.submissionErrorMessage).toBe("Title must contain at most 120 characters.");
    });

    it("exposes the pending state while the task is being saved", () => {
        mutationState.updateIsPending = true;

        const { result } = renderHook(() => useTaskFormController(initialTask));

        expect(result.current.isSubmittingTask).toBe(true);
    });
});
