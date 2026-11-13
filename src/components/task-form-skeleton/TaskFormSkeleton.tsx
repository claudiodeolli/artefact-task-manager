import formStyles from "@/components/task-form/task-form.module.css";
import TaskFormIntro from "@/components/task-form/TaskFormIntro";
import styles from "./task-form-skeleton.module.css";

type TaskFormSkeletonProperties = {
    readonly isEditingTask?: boolean;
};

export default function TaskFormSkeleton({ isEditingTask = false }: TaskFormSkeletonProperties) {
    return (
        <section className={formStyles.taskFormPage}>
            <span role="status" className="visuallyHidden">
                Loading the task form…
            </span>

            <TaskFormIntro isEditingTask={isEditingTask} />

            <div className={`${formStyles.taskForm} ${styles.skeletonAppear}`} aria-hidden="true">
                <div className={formStyles.taskFormField}>
                    <span className={formStyles.taskFormLabel}>Title</span>
                    <span className={`${formStyles.taskFormInput} ${styles.skeletonField}`}>&nbsp;</span>
                    <span className={formStyles.taskFormHint}>Required. Up to 120 characters.</span>
                </div>

                <div className={formStyles.taskFormField}>
                    <span className={formStyles.taskFormLabel}>Description</span>
                    <span className={`${formStyles.taskFormTextarea} ${styles.skeletonField}`}>&nbsp;</span>
                    <span className={formStyles.taskFormHint}>Optional. Up to 600 characters.</span>
                </div>

                <div className={formStyles.taskFormActions}>
                    <span className={`primaryButton ${styles.skeletonControl}`}>
                        {isEditingTask ? "Save changes" : "Add task"}
                    </span>
                    <span className={`secondaryButton ${styles.skeletonControl}`}>Cancel</span>
                </div>
            </div>
        </section>
    );
}
