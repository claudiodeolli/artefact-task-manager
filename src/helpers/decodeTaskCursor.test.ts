import { describe, expect, it } from "vitest";
import decodeTaskCursor from "./decodeTaskCursor";

describe("decodeTaskCursor", () => {
    it("decodes the creation timestamp and the identifier", () => {
        expect(decodeTaskCursor("2026-11-12T09:00:00.000Z|task-identifier")).toEqual({
            createdAt: "2026-11-12T09:00:00.000Z",
            id: "task-identifier",
        });
    });

    it("returns null for a missing cursor", () => {
        expect(decodeTaskCursor()).toBeNull();
        expect(decodeTaskCursor(null)).toBeNull();
        expect(decodeTaskCursor("")).toBeNull();
    });

    it("returns null for a malformed cursor", () => {
        expect(decodeTaskCursor("malformed-cursor")).toBeNull();
        expect(decodeTaskCursor("|task-identifier")).toBeNull();
        expect(decodeTaskCursor("2026-11-12T09:00:00.000Z|")).toBeNull();
    });
});
