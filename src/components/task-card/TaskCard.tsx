"use client";

import formatTaskCreationDate from "@/helpers/formatTaskCreationDate";
import formatTaskCreationDateCompact from "@/helpers/formatTaskCreationDateCompact";
import type { TaskDto } from "@/models/TaskDto";
import Link from "next/link";
import styles from "./task-card.module.css";

type TaskCardProperties = {
    readonly task: TaskDto;
    readonly isDeleting: boolean;
    readonly onDeleteRequested: (taskId: string) => void;
};

export default function TaskCard({ task, isDeleting, onDeleteRequested }: TaskCardProperties) {
    const compactCreationDate = formatTaskCreationDateCompact(task.createdAt);

    return (
        <article className={styles.taskCard}>
            <time
                className={styles.taskCardDate}
                dateTime={task.createdAt}
                aria-label={`Created ${formatTaskCreationDate(task.createdAt)} UTC`}
            >
                <span className={styles.taskCardDateDay}>{compactCreationDate.date}</span>
                <span className={styles.taskCardDateTime}>
                    {compactCreationDate.time}
                    <span className={styles.taskCardTimeZone}>UTC</span>
                </span>
            </time>

            <div className={styles.taskCardBody}>
                <h2 className={styles.taskCardTitle}>{task.title}</h2>
                {task.description ? (
                    <p className={styles.taskCardDescription}>{task.description}</p>
                ) : (
                    <p className={styles.taskCardEmptyDescription}>No description added.</p>
                )}
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
                    {isDeleting ? "Deleting…" : "Delete"}
                </button>
            </div>
        </article>
    );
}
