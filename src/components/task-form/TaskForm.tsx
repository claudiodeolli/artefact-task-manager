"use client";

import FeedbackMessage from "@/components/feedback-message/FeedbackMessage";
import useTaskFormController from "@/hooks/useTaskFormController";
import type { TaskDto } from "@/models/TaskDto";
import Link from "next/link";
import styles from "./task-form.module.css";

type TaskFormProperties = {
    readonly initialTask?: TaskDto;
};

export default function TaskForm({ initialTask }: TaskFormProperties) {
    const {
        title,
        description,
        validationMessage,
        submissionErrorMessage,
        isSubmittingTask,
        handleTitleChange,
        handleDescriptionChange,
        handleTaskFormSubmit,
    } = useTaskFormController(initialTask);

    const isEditingTask = Boolean(initialTask);
    const idleSubmitButtonLabel = isEditingTask ? "Save changes" : "Add task";
    const pendingSubmitButtonLabel = isEditingTask ? "Saving…" : "Adding…";
    const submitButtonLabel = isSubmittingTask ? pendingSubmitButtonLabel : idleSubmitButtonLabel;

    return (
        <section className={styles.taskFormPage}>
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

            <form className={styles.taskForm} onSubmit={handleTaskFormSubmit} noValidate>
                <FeedbackMessage message={submissionErrorMessage} tone="error" />

                <div className={styles.taskFormField}>
                    <label className={styles.taskFormLabel} htmlFor="task-title">
                        Title
                    </label>
                    <input
                        id="task-title"
                        name="title"
                        type="text"
                        className={styles.taskFormInput}
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="What needs to happen?"
                        maxLength={120}
                        autoComplete="off"
                        aria-invalid={validationMessage ? true : undefined}
                        aria-describedby={
                            validationMessage
                                ? "task-title-hint task-form-validation-message"
                                : "task-title-hint"
                        }
                        required
                    />
                    <p id="task-title-hint" className={styles.taskFormHint}>
                        Required. Up to 120 characters.
                    </p>
                </div>

                <div className={styles.taskFormField}>
                    <label className={styles.taskFormLabel} htmlFor="task-description">
                        Description
                    </label>
                    <textarea
                        id="task-description"
                        name="description"
                        className={styles.taskFormTextarea}
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="The detail someone would otherwise have to ask for."
                        maxLength={600}
                        rows={5}
                        aria-describedby="task-description-hint"
                    />
                    <p id="task-description-hint" className={styles.taskFormHint}>
                        Optional. Up to 600 characters.
                    </p>
                </div>

                <FeedbackMessage
                    id="task-form-validation-message"
                    message={validationMessage}
                    tone="error"
                />

                <div className={styles.taskFormActions}>
                    <button
                        type="submit"
                        className="primaryButton"
                        disabled={isSubmittingTask}
                        aria-busy={isSubmittingTask}
                    >
                        {submitButtonLabel}
                    </button>
                    <Link href="/" className="secondaryButton">
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}
