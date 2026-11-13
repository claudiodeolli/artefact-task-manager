import styles from "./task-form-skeleton.module.css";

export default function TaskFormSkeleton() {
    return (
        <div className={styles.taskFormSkeleton} role="status" aria-live="polite">
            <span className="visuallyHidden">Loading the task form…</span>

            <div className={styles.taskFormSkeletonIntro} aria-hidden="true">
                <span className={`${styles.skeletonBar} ${styles.skeletonEyebrow}`} />
                <span className={`${styles.skeletonBar} ${styles.skeletonTitle}`} />
                <span className={`${styles.skeletonBar} ${styles.skeletonDescription}`} />
            </div>

            <div className={styles.taskFormSkeletonSheet} aria-hidden="true">
                <span className={`${styles.skeletonBar} ${styles.skeletonLabel}`} />
                <span className={`${styles.skeletonBar} ${styles.skeletonInput}`} />
                <span className={`${styles.skeletonBar} ${styles.skeletonLabel}`} />
                <span className={`${styles.skeletonBar} ${styles.skeletonTextarea}`} />
                <span className={styles.taskFormSkeletonActions}>
                    <span className={`${styles.skeletonBar} ${styles.skeletonPill}`} />
                    <span className={`${styles.skeletonBar} ${styles.skeletonPill}`} />
                </span>
            </div>
        </div>
    );
}
