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

    return (
        <section className={styles.taskFormPage}>
            <header className={styles.taskFormHeader}>
                <p className={styles.taskFormEyebrow}>{isEditingTask ? "Edit task" : "New task"}</p>
                <h1 className={styles.taskFormTitle}>{isEditingTask ? "Update the task details" : "Create a task"}</h1>
                <p className={styles.taskFormDescription}>
                    {isEditingTask
                        ? "Change the title or the description and save your updates."
                        : "Add a title and an optional description to create a new task."}
                </p>
            </header>

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
                        maxLength={120}
                        autoComplete="off"
                        aria-invalid={validationMessage ? true : undefined}
                        aria-describedby={validationMessage ? "task-form-validation-message" : undefined}
                        required
                    />
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
                        maxLength={600}
                        rows={5}
                    />
                    <p className={styles.taskFormHint}>Optional. Keep it short and focused on the expected outcome.</p>
                </div>

                <FeedbackMessage id="task-form-validation-message" message={validationMessage} tone="error" />

                <div className={styles.taskFormActions}>
                    <button type="submit" className="primaryButton" disabled={isSubmittingTask} aria-busy={isSubmittingTask}>
                        {isSubmittingTask ? "Saving..." : isEditingTask ? "Save changes" : "Create task"}
                    </button>
                    <Link href="/" className="secondaryButton">
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}
