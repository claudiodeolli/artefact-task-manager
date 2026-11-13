const taskFeedbackMessageByStatus: Readonly<Record<string, string>> = {
    created: "Entry added to the ledger.",
    updated: "Entry updated in the ledger.",
};

export default function getTaskFeedbackMessage(status?: string | null): string | null {
    if (!status) {
        return null;
    }

    return taskFeedbackMessageByStatus[status] ?? null;
}
