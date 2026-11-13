import Link from "next/link";
import styles from "./application-header.module.css";

export default function ApplicationHeader() {
    return (
        <header className={styles.applicationHeader}>
            <div className={styles.applicationMasthead}>
                <Link href="/" className={styles.applicationBrand} aria-label="Task Manager home">
                    <span className={styles.applicationBrandMark} aria-hidden="true" />
                    <span className={styles.applicationBrandName}>Task Manager</span>
                </Link>
                <p className={styles.applicationRailLabel}>Work ledger / Vol. 01</p>
            </div>

            <nav className={styles.applicationNavigation} aria-label="Main navigation">
                <Link href="/" className={styles.applicationNavigationLink}>
                    Tasks
                </Link>
                <Link href="/tasks/new" className={`primaryButton ${styles.applicationNavigationAction}`}>
                    New task
                </Link>
            </nav>

            <div className={styles.applicationRailFooter}>
                <p className={styles.applicationRailQuote}>A quiet place for the work that matters.</p>
                <p className={styles.applicationRailColophon}>Kept in memory</p>
            </div>
        </header>
    );
}
