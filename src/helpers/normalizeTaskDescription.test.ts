import { describe, expect, it } from "vitest";
import normalizeTaskDescription from "./normalizeTaskDescription";

describe("normalizeTaskDescription", () => {
    it("trims the description", () => {
        expect(normalizeTaskDescription("  Consolidate the campaign metrics.  ")).toBe(
            "Consolidate the campaign metrics.",
        );
    });

    it("returns null for an empty description", () => {
        expect(normalizeTaskDescription("")).toBeNull();
        expect(normalizeTaskDescription("   ")).toBeNull();
    });

    it("returns null for a missing description", () => {
        expect(normalizeTaskDescription()).toBeNull();
        expect(normalizeTaskDescription(null)).toBeNull();
    });
});
