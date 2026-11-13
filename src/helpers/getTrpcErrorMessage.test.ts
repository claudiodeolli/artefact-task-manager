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
        expect(getTrpcErrorMessage(new Error("The ledger could not be loaded."))).toBe(
            "The ledger could not be loaded.",
        );
    });

    it("returns a friendly message for a missing task instead of its id", () => {
        const notFoundError = Object.assign(new Error('Task with id "missing-task" was not found.'), {
            data: { code: "NOT_FOUND", validationMessage: null },
        });

        expect(getTrpcErrorMessage(notFoundError)).toBe("This entry no longer exists. It may have been deleted.");
    });

    it("hides the server message of an internal error", () => {
        const internalError = Object.assign(new Error("Cannot read properties of undefined"), {
            data: { code: "INTERNAL_SERVER_ERROR", validationMessage: null },
        });

        expect(getTrpcErrorMessage(internalError)).toBe("An unexpected error occurred. Please try again.");
    });

    it("explains a network failure in plain language", () => {
        expect(getTrpcErrorMessage(new Error("Failed to fetch"))).toBe(
            "Could not reach the server. Check your connection and try again.",
        );
        expect(getTrpcErrorMessage(Object.assign(new Error("fetch failed"), { cause: new TypeError("offline") }))).toBe(
            "Could not reach the server. Check your connection and try again.",
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
