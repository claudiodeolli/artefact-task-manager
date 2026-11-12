const taskCreationDateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
});

export default function formatTaskCreationDate(createdAt: string): string {
    const creationDate = new Date(createdAt);

    if (Number.isNaN(creationDate.getTime())) {
        return "Unknown date";
    }

    return taskCreationDateFormatter.format(creationDate);
}
