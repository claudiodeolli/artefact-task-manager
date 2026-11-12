import Link from "next/link";
import styles from "./empty-task-list-message.module.css";

export default function EmptyTaskListMessage() {
    return (
        <div className={styles.emptyTaskListMessage}>
            <h2 className={styles.emptyTaskListTitle}>No tasks yet</h2>
            <p className={styles.emptyTaskListDescription}>
                Create your first task to start organising the work of your team.
            </p>
            <Link href="/tasks/new" className="primaryButton">
                Create a task
            </Link>
        </div>
    );
}
