import Task from "@/models/Task";

type CreateTestTaskOverrides = {
    readonly id?: string;
    readonly title?: string;
    readonly description?: string | null;
    readonly createdAt?: string;
};

export default function createTestTask(overrides: CreateTestTaskOverrides = {}): Task {
    return new Task({
        id: overrides.id ?? crypto.randomUUID(),
        title: overrides.title ?? "Prepare the weekly analytics review",
        description: overrides.description === undefined ? "Consolidate the campaign metrics." : overrides.description,
        createdAt: overrides.createdAt ?? "2026-11-12T12:00:00.000Z",
    });
}
