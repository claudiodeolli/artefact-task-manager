import cardStyles from "@/components/task-card/task-card.module.css";
import listStyles from "@/components/task-list/task-list.module.css";
import TaskListIntro from "@/components/task-list/TaskListIntro";
import styles from "./task-list-skeleton.module.css";

type TaskListSkeletonProperties = {
    readonly shouldShowHeader?: boolean;
    readonly entryCount?: number;
};

function TaskEntriesSkeleton({ entryCount }: { readonly entryCount: number }) {
    return (
        <div className={`${listStyles.taskListEntries} ${styles.skeletonAppear}`} aria-hidden="true">
            <ul className={listStyles.taskList}>
                {Array.from({ length: entryCount }, (_, entryIndex) => (
                    <li key={entryIndex}>
                        <div className={`${cardStyles.taskCard} ${styles.skeletonCard}`}>
                            <span className={cardStyles.taskCardDate}>
                                <span className={`${cardStyles.taskCardDateDay} ${styles.skeletonText}`}>
                                    0000.00.00
                                </span>
                                <span className={`${cardStyles.taskCardDateTime} ${styles.skeletonText}`}>
                                    00:00 UTC
                                </span>
                            </span>
                            <span className={cardStyles.taskCardBody}>
                                <span className={cardStyles.taskCardTitle}>
                                    <span className={styles.skeletonText}>Placeholder title for a ledger entry</span>
                                </span>
                                <span className={cardStyles.taskCardDescription}>
                                    <span className={styles.skeletonText}>
                                        A placeholder line for the entry description.
                                    </span>
                                </span>
                            </span>
                            <span className={cardStyles.taskCardActions}>
                                <span className={`secondaryButton ${styles.skeletonControl}`}>Edit</span>
                                <span className={`dangerButton ${styles.skeletonControl}`}>Delete</span>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function TaskListSkeleton({
    shouldShowHeader = false,
    entryCount = 4,
}: TaskListSkeletonProperties) {
    const loadingAnnouncement = (
        <span role="status" className="visuallyHidden">
            Loading entries…
        </span>
    );

    if (!shouldShowHeader) {
        return (
            <>
                {loadingAnnouncement}
                <TaskEntriesSkeleton entryCount={entryCount} />
            </>
        );
    }

    return (
        <section className={listStyles.taskListPage}>
            {loadingAnnouncement}

            <header className={listStyles.taskListHeader}>
                <TaskListIntro />

                <div className={`${listStyles.taskListCount} ${styles.skeletonAppear}`} aria-hidden="true">
                    <span
                        className={`${listStyles.taskListCountNumber} ${styles.skeletonTextOnDark} ${styles.skeletonNumber}`}
                    >
                        00
                    </span>
                    <span className={listStyles.taskListCountLabel}>entries</span>
                    <span className={`${listStyles.taskListCountShown} ${styles.skeletonTextOnDark}`}>
                        0 shown
                    </span>
                </div>
            </header>

            <TaskEntriesSkeleton entryCount={entryCount} />
        </section>
    );
}
