import TaskFactory from "@/services/TaskFactory";

type SeedTaskDefinition = {
    readonly title: string;
    readonly description: string | null;
    readonly hoursAgo: number;
};

const seedTaskDefinitions: readonly SeedTaskDefinition[] = [
    {
        title: "Prepare the weekly analytics review",
        description: "Consolidate the campaign metrics and share the summary with the team.",
        hoursAgo: 2,
    },
    {
        title: "Review the customer segmentation model",
        description: "Validate the new clusters with the marketing squad.",
        hoursAgo: 5,
    },
    {
        title: "Update the onboarding documentation",
        description: null,
        hoursAgo: 26,
    },
];

export default function createSeedTasks() {
    const currentTimestamp = Date.now();

    return seedTaskDefinitions.map(({ title, description, hoursAgo }) =>
        TaskFactory.createTask({
            title,
            description,
            createdAt: new Date(currentTimestamp - hoursAgo * 60 * 60 * 1000).toISOString(),
        }),
    );
}
