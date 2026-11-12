import TaskForm from "@/components/task-form/TaskForm";
import type { TaskDto } from "@/models/TaskDto";
import createServerTrpcCaller from "@/trpc/server/createServerTrpcCaller";
import { TRPCError } from "@trpc/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Edit task | Task Manager",
};

type EditTaskPageProperties = {
    readonly params: Promise<{
        readonly taskId: string;
    }>;
};

export default async function EditTaskPage({ params }: EditTaskPageProperties) {
    const { taskId } = await params;

    let initialTask: TaskDto;

    try {
        initialTask = await createServerTrpcCaller().task.getById({ taskId });
    } catch (error) {
        if (error instanceof TRPCError && error.code === "NOT_FOUND") {
            notFound();
        }

        throw error;
    }

    return <TaskForm initialTask={initialTask} />;
}
