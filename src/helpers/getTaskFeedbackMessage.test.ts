import { describe, expect, it } from "vitest";
import getTaskFeedbackMessage from "./getTaskFeedbackMessage";

describe("getTaskFeedbackMessage", () => {
    it("returns the message for a created task", () => {
        expect(getTaskFeedbackMessage("created")).toBe("Entry added to the ledger.");
    });

    it("returns the message for an updated task", () => {
        expect(getTaskFeedbackMessage("updated")).toBe("Entry updated in the ledger.");
    });

    it("returns the message for a reset demo", () => {
        expect(getTaskFeedbackMessage("reset")).toBe("Sample entries restored.");
    });

    it("returns null for an unknown status", () => {
        expect(getTaskFeedbackMessage("deleted")).toBeNull();
    });

    it("returns null when the status is missing", () => {
        expect(getTaskFeedbackMessage()).toBeNull();
        expect(getTaskFeedbackMessage(null)).toBeNull();
    });
});
