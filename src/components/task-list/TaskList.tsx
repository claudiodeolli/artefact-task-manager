"use client";

import EmptyTaskListMessage from "@/components/empty-task-list-message/EmptyTaskListMessage";
import FeedbackMessage from "@/components/feedback-message/FeedbackMessage";
import TaskCard from "@/components/task-card/TaskCard";
import useInfiniteScrollTrigger from "@/hooks/useInfiniteScrollTrigger";
import useTaskDeletionController from "@/hooks/useTaskDeletionController";
import useTaskListInfiniteQuery from "@/hooks/useTaskListInfiniteQuery";
import type { TaskListPage } from "@/models/TaskListPage";
import Link from "next/link";
import styles from "./task-list.module.css";

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
        taskListErrorMessage,
        loadMoreTasks,
        retryTaskListLoading,
    } = useTaskListInfiniteQuery(initialTaskPage);

    const { feedbackMessage, feedbackTone, deletingTaskId, deleteTaskById } =
        useTaskDeletionController(initialFeedbackMessage);

    const infiniteScrollSentinelReference = useInfiniteScrollTrigger({
        shouldTrigger: hasMoreTasks && !isLoadingMoreTasks,
        onTrigger: () => {
            void loadMoreTasks();
        },
    });

    return (
        <section className={styles.taskListPage}>
            <header className={styles.taskListHeader}>
                <div>
                    <p className={styles.taskListEyebrow}>Task manager</p>
                    <h1 className={styles.taskListTitle}>Tasks</h1>
                    <p className={styles.taskListSummary}>
                        Showing {taskDtoList.length} of {totalTaskCount} tasks
                    </p>
                </div>
                <Link href="/tasks/new" className="primaryButton">
                    New task
                </Link>
            </header>

            <FeedbackMessage message={feedbackMessage} tone={feedbackTone} />

            {taskListErrorMessage ? (
                <div className={styles.taskListError}>
                    <FeedbackMessage message={taskListErrorMessage} tone="error" />
                    <button type="button" className="secondaryButton" onClick={() => void retryTaskListLoading()}>
                        Try again
                    </button>
                </div>
            ) : null}

            {isInitialLoading ? (
                <p className={styles.taskListLoadingMore} role="status">
                    Loading tasks...
                </p>
            ) : taskDtoList.length === 0 ? (
                <EmptyTaskListMessage />
            ) : (
                <ul className={styles.taskList}>
                    {taskDtoList.map((task) => (
                        <li key={task.id}>
                            <TaskCard
                                task={task}
                                isDeleting={deletingTaskId === task.id}
                                onDeleteRequested={deleteTaskById}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {isLoadingMoreTasks ? (
                <p className={styles.taskListLoadingMore} role="status">
                    Loading more tasks...
                </p>
            ) : null}

            <div ref={infiniteScrollSentinelReference} className={styles.taskListScrollSentinel} aria-hidden="true" />
        </section>
    );
}
