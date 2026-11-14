"use client";

import EmptyTaskListMessage from "@/components/empty-task-list-message/EmptyTaskListMessage";
import FeedbackMessage from "@/components/feedback-message/FeedbackMessage";
import DeleteTaskConfirmationDialog from "@/components/delete-task-confirmation-dialog/DeleteTaskConfirmationDialog";
import DemoModeNotice from "@/components/demo-mode-notice/DemoModeNotice";
import TaskCard from "@/components/task-card/TaskCard";
import TaskListSkeleton from "@/components/task-list-skeleton/TaskListSkeleton";
import formatTaskEntryNoun from "@/helpers/formatTaskEntryNoun";
import useInfiniteScrollTrigger from "@/hooks/useInfiniteScrollTrigger";
import useStatusQueryParameterCleanup from "@/hooks/useStatusQueryParameterCleanup";
import useTaskDeletionController from "@/hooks/useTaskDeletionController";
import useTaskListInfiniteQuery from "@/hooks/useTaskListInfiniteQuery";
import type { TaskDto } from "@/models/TaskDto";
import type { TaskListPage } from "@/models/TaskListPage";
import { useState } from "react";
import styles from "./task-list.module.css";
import TaskListIntro from "./TaskListIntro";

type TaskListProperties = {
    readonly initialTaskPage: TaskListPage;
    readonly initialFeedbackMessage: string | null;
};

export default function TaskList({ initialTaskPage, initialFeedbackMessage }: TaskListProperties) {
    const {
        taskDtoList,
        totalTaskCount,
        isInitialLoading,
        isLoadingMoreTasks,
        hasMoreTasks,
        isRetryingTaskListLoading,
        taskListErrorMessage,
        loadMoreTasks,
        retryTaskListLoading,
    } = useTaskListInfiniteQuery(initialTaskPage);

    const { feedbackMessage, feedbackTone, deletingTaskIds, deleteTaskById } =
        useTaskDeletionController(initialFeedbackMessage);

    const [taskPendingDeletion, setTaskPendingDeletion] = useState<TaskDto | null>(null);
    const [taskDeletionReturnFocusElement, setTaskDeletionReturnFocusElement] =
        useState<HTMLElement | null>(null);

    useStatusQueryParameterCleanup();

    const infiniteScrollSentinelReference = useInfiniteScrollTrigger({
        shouldTrigger: hasMoreTasks && !isLoadingMoreTasks,
        onTrigger: () => {
            void loadMoreTasks();
        },
    });

    const requestTaskDeletion = (taskId: string) => {
        const task = taskDtoList.find((candidate) => candidate.id === taskId);

        if (task) {
            setTaskDeletionReturnFocusElement(
                document.activeElement instanceof HTMLElement ? document.activeElement : null,
            );
            setTaskPendingDeletion(task);
        }
    };

    const confirmTaskDeletion = async () => {
        const taskToDelete = taskPendingDeletion;

        if (!taskToDelete) {
            return;
        }

        const didDeleteTask = await deleteTaskById(taskToDelete.id);
        setTaskPendingDeletion(null);

        if (didDeleteTask) {
            window.requestAnimationFrame(() => {
                document.getElementById("main-content")?.focus();
            });
        }
    };

    return (
        <section className={styles.taskListPage}>
            <header className={styles.taskListHeader}>
                <TaskListIntro />

                <div
                    className={styles.taskListCount}
                    aria-label={`${totalTaskCount} ${formatTaskEntryNoun(totalTaskCount)} in the ledger`}
                >
                    <span className={styles.taskListCountNumber}>{totalTaskCount}</span>
                    <span className={styles.taskListCountLabel}>
                        {formatTaskEntryNoun(totalTaskCount)}
                    </span>
                    <span className={styles.taskListCountShown}>{taskDtoList.length} shown</span>
                </div>
            </header>

            <DemoModeNotice />

            <FeedbackMessage message={feedbackMessage} tone={feedbackTone} />

            {taskListErrorMessage ? (
                <div className={styles.taskListError}>
                    <FeedbackMessage message={taskListErrorMessage} tone="error" />
                    <button
                        type="button"
                        className="secondaryButton"
                        onClick={() => void retryTaskListLoading()}
                        disabled={isRetryingTaskListLoading}
                        aria-busy={isRetryingTaskListLoading}
                    >
                        {isRetryingTaskListLoading ? "Trying again…" : "Try again"}
                    </button>
                </div>
            ) : null}

            {isInitialLoading ? (
                <TaskListSkeleton />
            ) : taskDtoList.length === 0 ? (
                <EmptyTaskListMessage />
            ) : (
                <div className={styles.taskListEntries}>
                    <div className={styles.taskListColumnLabels} aria-hidden="true">
                        <span>Date / UTC</span>
                        <span>Entry</span>
                        <span>Actions</span>
                    </div>

                    <ul className={styles.taskList}>
                        {taskDtoList.map((task) => (
                            <li key={task.id}>
                                <TaskCard
                                    task={task}
                                    isDeleting={deletingTaskIds.has(task.id)}
                                    onDeleteRequested={requestTaskDeletion}
                                />
                            </li>
                        ))}
                    </ul>

                    {hasMoreTasks && !isLoadingMoreTasks ? (
                        <button
                            type="button"
                            className={`secondaryButton ${styles.taskListLoadMore}`}
                            onClick={() => void loadMoreTasks()}
                        >
                            Load more entries
                        </button>
                    ) : null}

                    {isLoadingMoreTasks ? (
                        <p className={styles.taskListLoadingMore} role="status">
                            Loading entries…
                        </p>
                    ) : null}
                </div>
            )}

            <div
                ref={infiniteScrollSentinelReference}
                className={styles.taskListScrollSentinel}
                aria-hidden="true"
            />

            <DeleteTaskConfirmationDialog
                task={taskPendingDeletion}
                isDeleting={
                    taskPendingDeletion
                        ? deletingTaskIds.has(taskPendingDeletion.id)
                        : false
                }
                returnFocusElement={taskDeletionReturnFocusElement}
                onCancel={() => setTaskPendingDeletion(null)}
                onConfirm={() => {
                    void confirmTaskDeletion();
                }}
            />
        </section>
    );
}
