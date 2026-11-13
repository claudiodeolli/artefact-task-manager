"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { taskListPageSize } from "@/constants/taskListPageSize";
import getTrpcErrorMessage from "@/helpers/getTrpcErrorMessage";
import type { TaskListPage } from "@/models/TaskListPage";
import { useTRPC } from "@/trpc/client/trpcReactContext";

export default function useTaskListInfiniteQuery(initialTaskPage: TaskListPage) {
    const trpc = useTRPC();

    const taskListQuery = useInfiniteQuery(
        trpc.task.list.infiniteQueryOptions(
            { pageSize: taskListPageSize },
            {
                getNextPageParam: (lastTaskPage) => lastTaskPage.nextCursor ?? undefined,
                initialData: {
                    pages: [initialTaskPage],
                    pageParams: [null],
                },
            },
        ),
    );

    const taskDtoList = taskListQuery.data?.pages.flatMap((taskPage) => taskPage.items) ?? [];
    const totalTaskCount = taskListQuery.data?.pages[0]?.totalTaskCount ?? 0;

    return {
        taskDtoList,
        totalTaskCount,
        isInitialLoading: taskListQuery.isPending,
        isLoadingMoreTasks: taskListQuery.isFetchingNextPage,
        hasMoreTasks: taskListQuery.hasNextPage,
        isRetryingTaskListLoading:
            Boolean(taskListQuery.error) && taskListQuery.isFetching && !taskListQuery.isFetchingNextPage,
        taskListErrorMessage: taskListQuery.error ? getTrpcErrorMessage(taskListQuery.error) : null,
        loadMoreTasks: taskListQuery.fetchNextPage,
        retryTaskListLoading: taskListQuery.refetch,
    };
}
