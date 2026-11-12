import Link from "next/link";
import styles from "./application-header.module.css";

export default function ApplicationHeader() {
    return (
        <header className={styles.applicationHeader}>
            <div className={styles.applicationHeaderContent}>
                <Link href="/" className={styles.applicationBrand}>
                    <span className={styles.applicationBrandMark} aria-hidden="true">
                        TM
                    </span>
                    <span>Task Manager</span>
                </Link>
                <nav aria-label="Main navigation">
                    <Link href="/tasks/new" className="primaryButton">
                        New task
                    </Link>
                </nav>
            </div>
        </header>
    );
}
