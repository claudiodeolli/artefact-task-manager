import { describe, expect, it } from "vitest";
import formatTaskCreationDate from "./formatTaskCreationDate";

describe("formatTaskCreationDate", () => {
    it("formats an ISO timestamp in a readable format", () => {
        expect(formatTaskCreationDate("2026-11-12T15:45:00.000Z")).toBe("Nov 12, 2026, 3:45 PM");
    });

    it("returns a fallback label for an invalid timestamp", () => {
        expect(formatTaskCreationDate("not-a-date")).toBe("Unknown date");
    });
});
