type CompactTaskCreationDate = {
    readonly date: string;
    readonly time: string;
};

export default function formatTaskCreationDateCompact(createdAt: string): CompactTaskCreationDate {
    const creationDate = new Date(createdAt);

    if (Number.isNaN(creationDate.getTime())) {
        return {
            date: "Unknown",
            time: "--:--",
        };
    }

    const isoDate = creationDate.toISOString();

    return {
        date: isoDate.slice(0, 10).replace(/-/g, "."),
        time: isoDate.slice(11, 16),
    };
}
