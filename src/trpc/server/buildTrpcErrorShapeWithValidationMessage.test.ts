import { createTaskInputSchema } from "@/schemas/createTaskInputSchema";
import { describe, expect, it } from "vitest";
import buildTrpcErrorShapeWithValidationMessage from "./buildTrpcErrorShapeWithValidationMessage";

const createZodError = () => {
    const validationResult = createTaskInputSchema.safeParse({ title: "" });

    if (validationResult.success) {
        throw new Error("The validation result should have failed.");
    }

    return validationResult.error;
};

const errorShape = {
    message: "Raw validation payload",
    code: 400,
    data: {
        httpStatus: 400,
    },
};

describe("buildTrpcErrorShapeWithValidationMessage", () => {
    it("adds the first validation message to the error shape", () => {
        const shapedError = buildTrpcErrorShapeWithValidationMessage(
            errorShape,
            Object.assign(new Error("Raw validation payload"), { cause: createZodError() }),
        );

        expect(shapedError.data.validationMessage).toBe("Title is required.");
        expect(shapedError.data).toMatchObject({ httpStatus: 400 });
        expect(shapedError.message).toBe("Raw validation payload");
    });

    it("replaces the message and drops the stack of internal server errors", () => {
        const shapedError = buildTrpcErrorShapeWithValidationMessage(
            {
                message: "Cannot read properties of undefined (reading 'id')",
                code: -32603,
                data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500, stack: "at /srv/app.js:12" },
            },
            new Error("Cannot read properties of undefined (reading 'id')"),
        );

        expect(shapedError.message).toBe("An unexpected error occurred. Please try again.");
        expect(shapedError.data).not.toHaveProperty("stack");
        expect(shapedError.data).toMatchObject({ code: "INTERNAL_SERVER_ERROR", httpStatus: 500 });
    });

    it("keeps the message of expected errors", () => {
        const shapedError = buildTrpcErrorShapeWithValidationMessage(
            { message: 'Task with id "x" was not found.', code: -32004, data: { code: "NOT_FOUND", httpStatus: 404 } },
            new Error('Task with id "x" was not found.'),
        );

        expect(shapedError.message).toBe('Task with id "x" was not found.');
    });

    it("adds a null validation message for errors that are not validation errors", () => {
        const shapedError = buildTrpcErrorShapeWithValidationMessage(errorShape, new Error("Unexpected failure"));

        expect(shapedError.data.validationMessage).toBeNull();
    });
});
