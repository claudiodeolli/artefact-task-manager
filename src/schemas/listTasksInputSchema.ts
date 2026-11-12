import { z } from "zod";

export const listTasksInputSchema = z.object({
    cursor: z.string().trim().min(1).nullish(),
    pageSize: z.number().int().min(1).max(50).default(10),
});

export type ListTasksInput = z.infer<typeof listTasksInputSchema>;
