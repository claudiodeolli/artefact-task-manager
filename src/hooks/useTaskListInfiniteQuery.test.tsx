import { useInfiniteQuery } from "@tanstack/react-query";
import type { TaskListPage } from "@/models/TaskListPage";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTaskListInfiniteQuery from "./useTaskListInfiniteQuery";

const trpcState = vi.hoisted(() => ({
    infiniteQueryOptions: vi.fn(() => ({})),
}));

vi.mock("@tanstack/react-query", () => ({
    useInfiniteQuery: vi.fn(),
}));

vi.mock("@/trpc/client/trpcReactContext", () => ({
    useTRPC: () => ({
        task: {
            list: {
                infiniteQueryOptions: trpcState.infiniteQueryOptions,
            },
        },
    }),
}));

const firstTaskPage: TaskListPage = {
    items: [
        {
            id: "first-task",
            title: "Prepare the weekly analytics review",
            description: "Consolidate the campaign metrics.",
            createdAt: "2026-11-12T12:00:00.000Z",
        },
    ],
    nextCursor: "middle-task",
    totalTaskCount: 2,
};

const secondTaskPage: TaskListPage = {
    items: [
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

const createQueryResult = (overrides: Record<string, unknown> = {}) => ({
    data: {
        pages: [firstTaskPage, secondTaskPage],
        pageParams: [null, "middle-task"],
    },
    isPending: false,
    isFetching: false,
    isFetchingNextPage: false,
    hasNextPage: false,
    error: null,
    fetchNextPage: vi.fn(),
    refetch: vi.fn(),
    ...overrides,
});

describe("useTaskListInfiniteQuery", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("aggregates the tasks of every loaded page", () => {
        vi.mocked(useInfiniteQuery).mockReturnValue(
            createQueryResult() as unknown as ReturnType<typeof useInfiniteQuery>,
        );

        const { result } = renderHook(() => useTaskListInfiniteQuery(firstTaskPage));

        expect(result.current.taskDtoList.map((task) => task.id)).toEqual(["first-task", "second-task"]);
        expect(result.current.totalTaskCount).toBe(2);
        expect(result.current.hasMoreTasks).toBe(false);
        expect(trpcState.infiniteQueryOptions).toHaveBeenCalledWith(
            { pageSize: 10 },
            expect.objectContaining({ getNextPageParam: expect.any(Function) }),
        );
    });

    it("exposes the loading and error states received from the query", () => {
        vi.mocked(useInfiniteQuery).mockReturnValue(
            createQueryResult({
                isPending: true,
                isFetchingNextPage: true,
                hasNextPage: true,
                error: new Error("The task list could not be loaded."),
            }) as unknown as ReturnType<typeof useInfiniteQuery>,
        );

        const { result } = renderHook(() => useTaskListInfiniteQuery(firstTaskPage));

        expect(result.current.isInitialLoading).toBe(true);
        expect(result.current.isLoadingMoreTasks).toBe(true);
        expect(result.current.hasMoreTasks).toBe(true);
        expect(result.current.taskListErrorMessage).toBe("The task list could not be loaded.");
        expect(result.current.isRetryingTaskListLoading).toBe(false);
    });

    it("reports a retry while the failed list is fetched again", () => {
        vi.mocked(useInfiniteQuery).mockReturnValue(
            createQueryResult({
                isFetching: true,
                error: new Error("The task list could not be loaded."),
            }) as unknown as ReturnType<typeof useInfiniteQuery>,
        );

        const { result } = renderHook(() => useTaskListInfiniteQuery(firstTaskPage));

        expect(result.current.isRetryingTaskListLoading).toBe(true);
    });

    it("does not report a retry while only the next page is loading", () => {
        vi.mocked(useInfiniteQuery).mockReturnValue(
            createQueryResult({
                isFetching: true,
                isFetchingNextPage: true,
                error: new Error("The task list could not be loaded."),
            }) as unknown as ReturnType<typeof useInfiniteQuery>,
        );

        const { result } = renderHook(() => useTaskListInfiniteQuery(firstTaskPage));

        expect(result.current.isRetryingTaskListLoading).toBe(false);
    });
});
