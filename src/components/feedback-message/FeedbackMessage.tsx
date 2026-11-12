import type { FeedbackTone } from "@/models/FeedbackTone";
import styles from "./feedback-message.module.css";

type FeedbackMessageProperties = {
    readonly message: string | null;
    readonly tone: FeedbackTone;
    readonly id?: string;
};

export default function FeedbackMessage({ message, tone, id }: FeedbackMessageProperties) {
    if (!message) {
        return null;
    }

    const toneClassName = tone === "error" ? styles.feedbackMessageError : styles.feedbackMessageSuccess;

    return (
        <p id={id} role={tone === "error" ? "alert" : "status"} className={`${styles.feedbackMessage} ${toneClassName}`}>
            {message}
        </p>
    );
}
