import Link from "next/link";
import styles from "./empty-task-list-message.module.css";

export default function EmptyTaskListMessage() {
    return (
        <div className={styles.emptyTaskListMessage}>
            <p className={styles.emptyTaskListEyebrow}>No entries</p>
            <h2 className={styles.emptyTaskListTitle}>The ledger is empty.</h2>
            <p className={styles.emptyTaskListDescription}>
                Every good week starts with a first line. Add a task to begin.
            </p>
            <Link href="/tasks/new" className="secondaryButton">
                Add the first task
            </Link>
        </div>
    );
}
