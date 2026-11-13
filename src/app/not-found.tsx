import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <section className={styles.notFoundPage}>
            <p className={styles.notFoundEyebrow}>404 / Missing entry</p>
            <h1 className={styles.notFoundTitle}>This entry is gone.</h1>
            <p className={styles.notFoundDescription}>
                It may have been deleted, or the link may be wrong.
            </p>
            <Link href="/" className="secondaryButton">
                Back to tasks
            </Link>
        </section>
    );
}
