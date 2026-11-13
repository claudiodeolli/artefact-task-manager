import { describe, expect, it } from "vitest";
import formatTaskEntryNoun from "./formatTaskEntryNoun";

describe("formatTaskEntryNoun", () => {
    it("uses the singular form for one entry", () => {
        expect(formatTaskEntryNoun(1)).toBe("entry");
    });

    it("uses the plural form for zero or many entries", () => {
        expect(formatTaskEntryNoun(0)).toBe("entries");
        expect(formatTaskEntryNoun(2)).toBe("entries");
    });
});
