import { createTaskInputSchema } from "@/schemas/createTaskInputSchema";
import { describe, expect, it } from "vitest";
import formatZodValidationMessage from "./formatZodValidationMessage";

describe("formatZodValidationMessage", () => {
    it("returns the first validation issue message", () => {
        const validationResult = createTaskInputSchema.safeParse({ title: "   " });

        if (validationResult.success) {
            throw new Error("The validation result should have failed.");
        }

        expect(formatZodValidationMessage(validationResult.error)).toBe("Title is required.");
    });
});
