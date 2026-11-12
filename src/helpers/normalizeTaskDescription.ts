export default function normalizeTaskDescription(description?: string | null): string | null {
    const normalizedDescription = description?.trim();

    return normalizedDescription ? normalizedDescription : null;
}
