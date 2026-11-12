"use client";

import formatTaskCreationDate from "@/helpers/formatTaskCreationDate";
import type { TaskDto } from "@/models/TaskDto";
import Link from "next/link";
import styles from "./task-card.module.css";

type TaskCardProperties = {
    readonly task: TaskDto;
    readonly isDeleting: boolean;
    readonly onDeleteRequested: (taskId: string) => void;
};

export default function TaskCard({ task, isDeleting, onDeleteRequested }: TaskCardProperties) {
    return (
        <article className={styles.taskCard}>
            <div className={styles.taskCardContent}>
                <h2 className={styles.taskCardTitle}>{task.title}</h2>
                {task.description ? (
                    <p className={styles.taskCardDescription}>{task.description}</p>
                ) : (
                    <p className={styles.taskCardEmptyDescription}>No description provided.</p>
                )}
                <p className={styles.taskCardMetadata}>
                    Created <time dateTime={task.createdAt}>{formatTaskCreationDate(task.createdAt)}</time>
                </p>
            </div>
            <div className={styles.taskCardActions}>
                <Link href={`/tasks/${task.id}/edit`} className="secondaryButton">
                    Edit
                </Link>
                <button
                    type="button"
                    className="dangerButton"
                    onClick={() => onDeleteRequested(task.id)}
                    disabled={isDeleting}
                    aria-busy={isDeleting}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </article>
    );
}
