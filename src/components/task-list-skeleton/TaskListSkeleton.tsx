import styles from "./task-list-skeleton.module.css";

type TaskListSkeletonProperties = {
    readonly shouldShowHeader?: boolean;
    readonly entryCount?: number;
};

export default function TaskListSkeleton({
    shouldShowHeader = false,
    entryCount = 4,
}: TaskListSkeletonProperties) {
    return (
        <div className={styles.taskListSkeleton} role="status" aria-live="polite">
            <span className="visuallyHidden">Loading entries…</span>

            {shouldShowHeader ? (
                <div className={styles.taskListSkeletonHeader} aria-hidden="true">
                    <div className={styles.taskListSkeletonHeading}>
                        <span className={`${styles.skeletonBar} ${styles.skeletonEyebrow}`} />
                        <span className={`${styles.skeletonBar} ${styles.skeletonTitle}`} />
                        <span className={`${styles.skeletonBar} ${styles.skeletonDescription}`} />
                    </div>
                    <div className={styles.taskListSkeletonCount} />
                </div>
            ) : null}

            <ul className={styles.taskListSkeletonEntries} aria-hidden="true">
                {Array.from({ length: entryCount }, (_, entryIndex) => (
                    <li key={entryIndex} className={styles.taskListSkeletonEntry}>
                        <span className={`${styles.skeletonBar} ${styles.skeletonDate}`} />
                        <span className={styles.taskListSkeletonEntryBody}>
                            <span className={`${styles.skeletonBar} ${styles.skeletonEntryTitle}`} />
                            <span className={`${styles.skeletonBar} ${styles.skeletonEntryText}`} />
                        </span>
                        <span className={styles.taskListSkeletonEntryActions}>
                            <span className={`${styles.skeletonBar} ${styles.skeletonPill}`} />
                            <span className={`${styles.skeletonBar} ${styles.skeletonPill}`} />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
