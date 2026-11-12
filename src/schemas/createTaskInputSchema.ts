import { z } from "zod";

export const createTaskInputSchema = z.object({
    title: z
        .string({ message: "Title is required." })
        .trim()
        .min(1, { message: "Title is required." })
        .max(120, { message: "Title must contain at most 120 characters." }),
    description: z
        .string()
        .trim()
        .max(600, { message: "Description must contain at most 600 characters." })
        .optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
