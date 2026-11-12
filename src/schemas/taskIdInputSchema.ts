import { z } from "zod";

export const taskIdInputSchema = z.object({
    taskId: z.string().trim().min(1, { message: "Task id is required." }),
});

export type TaskIdInput = z.infer<typeof taskIdInputSchema>;
