import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmptyTaskListMessage from "./EmptyTaskListMessage";

describe("EmptyTaskListMessage", () => {
    it("renders the empty state with a link to create a task", () => {
        render(<EmptyTaskListMessage />);

        expect(screen.getByRole("heading", { name: "The ledger is empty." })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Add the first task" })).toHaveAttribute(
            "href",
            "/tasks/new",
        );
    });
});
