import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeedbackMessage from "./FeedbackMessage";

describe("FeedbackMessage", () => {
    it("does not render when there is no message", () => {
        const { container } = render(<FeedbackMessage message={null} tone="success" />);

        expect(container).toBeEmptyDOMElement();
    });

    it("renders a success message as a status", () => {
        render(<FeedbackMessage message="Task deleted successfully." tone="success" />);

        expect(screen.getByRole("status")).toHaveTextContent("Task deleted successfully.");
    });

    it("renders an error message as an alert", () => {
        render(<FeedbackMessage id="task-form-validation-message" message="Title is required." tone="error" />);

        expect(screen.getByRole("alert")).toHaveTextContent("Title is required.");
        expect(screen.getByRole("alert")).toHaveAttribute("id", "task-form-validation-message");
    });
});
