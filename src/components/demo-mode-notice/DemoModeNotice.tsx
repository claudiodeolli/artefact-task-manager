"use client";

import getTrpcErrorMessage from "@/helpers/getTrpcErrorMessage";
import useResetDemoTasksMutation from "@/hooks/useResetDemoTasksMutation";
import { useRef, useState } from "react";
import styles from "./demo-mode-notice.module.css";

export default function DemoModeNotice() {
    const resetDemoTasksMutation = useResetDemoTasksMutation();
    const [isConfirmingReset, setIsConfirmingReset] = useState(false);
    const resetButtonReference = useRef<HTMLButtonElement>(null);
    const cancelButtonReference = useRef<HTMLButtonElement>(null);

    const resetErrorMessage = resetDemoTasksMutation.error
        ? getTrpcErrorMessage(resetDemoTasksMutation.error)
        : null;

    const requestResetConfirmation = () => {
        setIsConfirmingReset(true);
        window.requestAnimationFrame(() => cancelButtonReference.current?.focus());
    };

    const cancelResetConfirmation = () => {
        setIsConfirmingReset(false);
        window.requestAnimationFrame(() => resetButtonReference.current?.focus());
    };

    const confirmReset = () => {
        resetDemoTasksMutation.mutate(undefined, {
            onSuccess: () => {
                window.location.assign("/?status=reset");
            },
        });
    };

    if (!isConfirmingReset) {
        return (
            <section className={styles.demoModeNotice} aria-label="Demo data">
                <p className={styles.demoModeMessage}>
                    <span className={styles.demoModeLabel}>Demo mode</span>
                    Data lives in memory and resets when the application restarts.
                </p>

                <button
                    ref={resetButtonReference}
                    type="button"
                    className="secondaryButton"
                    onClick={requestResetConfirmation}
                >
                    Reset demo
                </button>
            </section>
        );
    }

    return (
        <section className={styles.demoModeNotice} aria-label="Reset demo data">
            <p className={styles.demoModeMessage}>
                <span className={styles.demoModeLabel}>Reset demo</span>
                Restore the three sample entries? Current changes will be lost.
            </p>

            <div className={styles.demoModeActions}>
                {resetErrorMessage ? (
                    <p className={styles.demoModeError} role="alert">
                        {resetErrorMessage}
                    </p>
                ) : null}

                <button
                    ref={cancelButtonReference}
                    type="button"
                    className="secondaryButton"
                    onClick={cancelResetConfirmation}
                    disabled={resetDemoTasksMutation.isPending}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="dangerButton"
                    onClick={confirmReset}
                    disabled={resetDemoTasksMutation.isPending}
                    aria-busy={resetDemoTasksMutation.isPending}
                >
                    {resetDemoTasksMutation.isPending ? "Resetting…" : "Reset demo"}
                </button>
            </div>
        </section>
    );
}
