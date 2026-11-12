import TaskForm from "@/components/task-form/TaskForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "New task | Task Manager",
};

export default function NewTaskPage() {
    return <TaskForm />;
}
