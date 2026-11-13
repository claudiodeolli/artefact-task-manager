import styles from "./task-form.module.css";

type TaskFormIntroProperties = {
    readonly isEditingTask: boolean;
};

export default function TaskFormIntro({ isEditingTask }: TaskFormIntroProperties) {
    return (
        <div className={styles.taskFormIntro}>
            <p className={styles.taskFormEyebrow}>{isEditingTask ? "Edit entry" : "New entry"}</p>
            <h1 className={styles.taskFormTitle}>
                {isEditingTask ? "Revise the entry." : "Write it down."}
            </h1>
            <p className={styles.taskFormDescription}>
                {isEditingTask
                    ? "Change what moved. The rest of the ledger stays as it was."
                    : "A clear title is enough. Add context if it helps the next person."}
            </p>

            <div className={styles.taskFormNote}>
                <p className={styles.taskFormNoteLabel}>A good entry</p>
                <p className={styles.taskFormNoteText}>
                    A title that starts with a verb. A description with the one detail someone
                    would otherwise have to ask for.
                </p>
            </div>
        </div>
    );
}
