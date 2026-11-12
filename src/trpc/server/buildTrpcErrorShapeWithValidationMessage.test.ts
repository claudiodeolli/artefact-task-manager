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

    it("adds a null validation message for errors that are not validation errors", () => {
        const shapedError = buildTrpcErrorShapeWithValidationMessage(errorShape, new Error("Unexpected failure"));

        expect(shapedError.data.validationMessage).toBeNull();
    });
});
