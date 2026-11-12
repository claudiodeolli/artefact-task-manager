import type { TaskDto } from "./TaskDto";

export type TaskListPage = {
    readonly items: readonly TaskDto[];
    readonly nextCursor: string | null;
    readonly totalTaskCount: number;
};
