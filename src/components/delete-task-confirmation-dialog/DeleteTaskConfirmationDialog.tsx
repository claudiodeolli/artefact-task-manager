"use client";

import type { TaskDto } from "@/models/TaskDto";
import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from "react";
import styles from "./delete-task-confirmation-dialog.module.css";

type DeleteTaskConfirmationDialogProperties = {
    readonly task: TaskDto | null;
    readonly isDeleting: boolean;
    readonly returnFocusElement?: HTMLElement | null;
    readonly onCancel: () => void;
    readonly onConfirm: () => void;
};

export default function DeleteTaskConfirmationDialog({
    task,
    isDeleting,
    returnFocusElement,
    onCancel,
    onConfirm,
}: DeleteTaskConfirmationDialogProperties) {
    const dialogReference = useRef<HTMLDialogElement>(null);
    const previouslyFocusedElementReference = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const dialog = dialogReference.current;

        if (!dialog) {
            return undefined;
        }

        previouslyFocusedElementReference.current =
            returnFocusElement ??
            (document.activeElement instanceof HTMLElement ? document.activeElement : null);

        if (!dialog.open) {
            dialog.showModal();
        }

        return () => {
            if (dialog.open) {
                dialog.close();
            }

            const previouslyFocusedElement = previouslyFocusedElementReference.current;

            if (previouslyFocusedElement?.isConnected) {
                previouslyFocusedElement.focus();
            }
        };
    }, [returnFocusElement, task]);

    if (!task) {
        return null;
    }

    const handleDialogCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault();

        if (!isDeleting) {
            onCancel();
        }
    };

    const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget && !isDeleting) {
            onCancel();
        }
    };

    return (
        <dialog
            ref={dialogReference}
            className={styles.dialog}
            aria-labelledby="delete-task-confirmation-title"
            aria-describedby="delete-task-confirmation-description"
            aria-modal="true"
            onCancel={handleDialogCancel}
            onClick={handleDialogClick}
        >
            <div className={styles.dialogAccent} aria-hidden="true" />

            <div className={styles.dialogBody}>
                <p className={styles.dialogEyebrow}>Delete entry</p>

                <h2 id="delete-task-confirmation-title" className={styles.dialogTitle}>
                    Delete this entry?
                </h2>

                <p
                    id="delete-task-confirmation-description"
                    className={styles.dialogDescription}
                >
                    This will permanently remove the entry below from the ledger. This action
                    cannot be undone.
                </p>

                <p className={styles.dialogTaskTitle}>{task.title}</p>

                <div className={styles.dialogActions}>
                    <button
                        type="button"
                        className="secondaryButton"
                        onClick={onCancel}
                        disabled={isDeleting}
                        autoFocus
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="primaryButton"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        aria-busy={isDeleting}
                    >
                        {isDeleting ? "Deleting…" : "Delete entry"}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
