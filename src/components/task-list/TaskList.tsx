"use client";

import EmptyTaskListMessage from "@/components/empty-task-list-message/EmptyTaskListMessage";
import FeedbackMessage from "@/components/feedback-message/FeedbackMessage";
import TaskCard from "@/components/task-card/TaskCard";
import useInfiniteScrollTrigger from "@/hooks/useInfiniteScrollTrigger";
import useTaskDeletionController from "@/hooks/useTaskDeletionController";
import useTaskListInfiniteQuery from "@/hooks/useTaskListInfiniteQuery";
import type { TaskListPage } from "@/models/TaskListPage";
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
                <div className={styles.taskListHeading}>
                    <p className={styles.taskListEyebrow}>All entries</p>
                    <h1 className={styles.taskListTitle}>Tasks, in order.</h1>
                    <p className={styles.taskListDescription}>
                        Everything currently on the desk, newest first.
                    </p>
                </div>

                <div
                    className={styles.taskListCount}
                    aria-label={`${totalTaskCount} entries in the ledger`}
                >
                    <span className={styles.taskListCountNumber}>{totalTaskCount}</span>
                    <span className={styles.taskListCountLabel}>entries</span>
                    <span className={styles.taskListCountShown}>{taskDtoList.length} shown</span>
                </div>
            </header>

            <FeedbackMessage message={feedbackMessage} tone={feedbackTone} />

            {taskListErrorMessage ? (
                <div className={styles.taskListError}>
                    <FeedbackMessage message={taskListErrorMessage} tone="error" />
                    <button
                        type="button"
                        className="secondaryButton"
                        onClick={() => void retryTaskListLoading()}
                    >
                        Try again
                    </button>
                </div>
            ) : null}

            {isInitialLoading ? (
                <p className={styles.taskListLoadingMore} role="status">
                    Loading entries…
                </p>
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
                                    isDeleting={deletingTaskId === task.id}
                                    onDeleteRequested={deleteTaskById}
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
        </section>
    );
}
