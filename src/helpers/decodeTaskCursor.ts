import type { TaskCursor } from "@/models/TaskCursor";

export default function decodeTaskCursor(cursor?: string | null): TaskCursor | null {
    if (!cursor) {
        return null;
    }

    const separatorIndex = cursor.indexOf("|");

    if (separatorIndex <= 0 || separatorIndex === cursor.length - 1) {
        return null;
    }

    return {
        createdAt: cursor.slice(0, separatorIndex),
        id: cursor.slice(separatorIndex + 1),
    };
}
