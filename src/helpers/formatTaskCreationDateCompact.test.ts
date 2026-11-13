import { describe, expect, it } from "vitest";
import formatTaskCreationDateCompact from "./formatTaskCreationDateCompact";

describe("formatTaskCreationDateCompact", () => {
    it("formats an ISO timestamp as a ledger date and time", () => {
        expect(formatTaskCreationDateCompact("2026-11-12T15:45:00.000Z")).toEqual({
            date: "2026.11.12",
            time: "15:45",
        });
    });

    it("returns a fallback for an invalid timestamp", () => {
        expect(formatTaskCreationDateCompact("not-a-date")).toEqual({
            date: "Unknown",
            time: "--:--",
        });
    });
});
