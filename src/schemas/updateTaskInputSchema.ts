import { z } from "zod";

export const updateTaskInputSchema = z
    .object({
        taskId: z.string().trim().min(1, { message: "Task id is required." }),
        title: z
            .string()
            .trim()
            .min(1, { message: "Title is required." })
            .max(120, { message: "Title must contain at most 120 characters." })
            .optional(),
        description: z
            .string()
            .trim()
            .max(600, { message: "Description must contain at most 600 characters." })
            .nullable()
            .optional(),
    })
    .refine((input) => input.title !== undefined || input.description !== undefined, {
        message: "Provide at least one field to update.",
    });

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
