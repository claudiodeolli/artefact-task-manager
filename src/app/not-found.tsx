import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <section className={styles.notFoundPage}>
            <p className={styles.notFoundCode}>404</p>
            <h1 className={styles.notFoundTitle}>Task not found</h1>
            <p className={styles.notFoundDescription}>
                The task you are looking for does not exist or has already been deleted.
            </p>
            <Link href="/" className="primaryButton">
                Back to tasks
            </Link>
        </section>
    );
}
