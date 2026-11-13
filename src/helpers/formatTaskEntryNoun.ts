export default function formatTaskEntryNoun(taskCount: number): string {
    return taskCount === 1 ? "entry" : "entries";
}
