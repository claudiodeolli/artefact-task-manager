import { describe, expect, it } from "vitest";
import getTaskFeedbackMessage from "./getTaskFeedbackMessage";

describe("getTaskFeedbackMessage", () => {
    it("returns the message for a created task", () => {
        expect(getTaskFeedbackMessage("created")).toBe("Task created successfully.");
    });

    it("returns the message for an updated task", () => {
        expect(getTaskFeedbackMessage("updated")).toBe("Task updated successfully.");
    });

    it("returns null for an unknown status", () => {
        expect(getTaskFeedbackMessage("deleted")).toBeNull();
    });

    it("returns null when the status is missing", () => {
        expect(getTaskFeedbackMessage()).toBeNull();
        expect(getTaskFeedbackMessage(null)).toBeNull();
    });
});
