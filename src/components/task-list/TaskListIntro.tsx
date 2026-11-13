import styles from "./task-list.module.css";

export default function TaskListIntro() {
    return (
        <div className={styles.taskListHeading}>
            <p className={styles.taskListEyebrow}>All entries</p>
            <h1 className={styles.taskListTitle}>Tasks, in order.</h1>
            <p className={styles.taskListDescription}>Everything currently on the desk, newest first.</p>
        </div>
    );
}
