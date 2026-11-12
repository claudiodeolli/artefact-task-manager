const taskFeedbackMessageByStatus: Readonly<Record<string, string>> = {
    created: "Task created successfully.",
    updated: "Task updated successfully.",
};

export default function getTaskFeedbackMessage(status?: string | null): string | null {
    if (!status) {
        return null;
    }

    return taskFeedbackMessageByStatus[status] ?? null;
}
