import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TaskFormSkeleton from "./TaskFormSkeleton";

describe("TaskFormSkeleton", () => {
    it("announces the loading of the task form", () => {
        render(<TaskFormSkeleton />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading the task form…");
    });
});
