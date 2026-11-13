import styles from "./application-footer.module.css";

export default function ApplicationFooter() {
    return (
        <footer className={styles.applicationFooter}>
            <div className={styles.applicationFooterContent}>
                <p className={styles.applicationFooterQuote}>
                    A quiet place for the work that matters.
                </p>
                <p className={styles.applicationFooterColophon}>Kept in memory / Vol. 01</p>
            </div>
        </footer>
    );
}
