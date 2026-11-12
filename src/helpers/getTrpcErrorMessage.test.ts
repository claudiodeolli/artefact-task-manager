import { describe, expect, it } from "vitest";
import getTrpcErrorMessage from "./getTrpcErrorMessage";

describe("getTrpcErrorMessage", () => {
    it("returns the validation message from a tRPC client error", () => {
        const errorWithValidationMessage = Object.assign(new Error("Raw validation payload"), {
            data: { validationMessage: "Title is required." },
        });

        expect(getTrpcErrorMessage(errorWithValidationMessage)).toBe("Title is required.");
    });

    it("returns the error message when no validation message exists", () => {
        expect(getTrpcErrorMessage(new Error("Task with id \"missing-task\" was not found."))).toBe(
            'Task with id "missing-task" was not found.',
        );
    });

    it("returns a generic message for an unknown error", () => {
        expect(getTrpcErrorMessage(null)).toBe("An unexpected error occurred. Please try again.");
        expect(getTrpcErrorMessage("unexpected")).toBe("An unexpected error occurred. Please try again.");
    });

    it("returns a generic message when the error message is empty", () => {
        expect(getTrpcErrorMessage(new Error(""))).toBe("An unexpected error occurred. Please try again.");
    });
});
