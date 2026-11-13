import TaskList from "@/components/task-list/TaskList";
import { taskListPageSize } from "@/constants/taskListPageSize";
import getTaskFeedbackMessage from "@/helpers/getTaskFeedbackMessage";
import createServerTrpcCaller from "@/trpc/server/createServerTrpcCaller";

export const dynamic = "force-dynamic";

type TaskListPageProperties = {
    readonly searchParams: Promise<{
        readonly status?: string;
    }>;
};

export default async function TaskListPage({ searchParams }: TaskListPageProperties) {
    const { status } = await searchParams;
    const initialTaskPage = await createServerTrpcCaller().task.list({ pageSize: taskListPageSize });

    return (
        <TaskList initialTaskPage={initialTaskPage} initialFeedbackMessage={getTaskFeedbackMessage(status)} />
    );
}
