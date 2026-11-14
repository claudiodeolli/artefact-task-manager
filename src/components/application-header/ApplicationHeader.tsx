"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./application-header.module.css";

export default function ApplicationHeader() {
    const pathname = usePathname();
    const shouldShowNewTaskAction = !pathname?.startsWith("/tasks/");

    return (
        <header className={styles.applicationHeader}>
            <div className={styles.applicationHeaderContent}>
                <div className={styles.applicationMasthead}>
                    <Link href="/" className={styles.applicationBrand} aria-label="Task Manager home">
                        <span className={styles.applicationBrandMark} aria-hidden="true" />
                        <span className={styles.applicationBrandName}>Task Manager</span>
                    </Link>
                </div>

                {shouldShowNewTaskAction ? (
                    <nav className={styles.applicationNavigation} aria-label="Primary">
                        <Link
                            href="/tasks/new"
                            className={`primaryButton ${styles.applicationAction}`}
                        >
                            <span className={styles.applicationActionMark} aria-hidden="true">
                                +
                            </span>
                            New task
                        </Link>
                    </nav>
                ) : null}
            </div>
        </header>
    );
}
