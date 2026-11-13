import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TaskFormSkeleton from "./TaskFormSkeleton";

describe("TaskFormSkeleton", () => {
    it("announces the loading of the task form", () => {
        render(<TaskFormSkeleton />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading the task form…");
    });

    it("renders the creation intro while the new task form loads", () => {
        render(<TaskFormSkeleton />);

        expect(screen.getByRole("heading", { name: "Write it down." })).toBeInTheDocument();
    });

    it("renders the editing intro while the edit form loads", () => {
        render(<TaskFormSkeleton isEditingTask />);

        expect(screen.getByRole("heading", { name: "Revise the entry." })).toBeInTheDocument();
    });

    it("does not render interactive controls", () => {
        render(<TaskFormSkeleton isEditingTask />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
});
