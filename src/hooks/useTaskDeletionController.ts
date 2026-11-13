"use client";

import getTrpcErrorMessage from "@/helpers/getTrpcErrorMessage";
import type { FeedbackTone } from "@/models/FeedbackTone";
import { useState } from "react";
import useDeleteTaskMutation from "./useDeleteTaskMutation";

export default function useTaskDeletionController(initialFeedbackMessage: string | null) {
    const deleteTaskMutation = useDeleteTaskMutation();
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(initialFeedbackMessage);
    const [feedbackTone, setFeedbackTone] = useState<FeedbackTone>("success");
    const [deletingTaskIds, setDeletingTaskIds] = useState<ReadonlySet<string>>(() => new Set());

    const deleteTaskById = async (taskId: string) => {
        if (deletingTaskIds.has(taskId)) {
            return;
        }

        setDeletingTaskIds((currentTaskIds) => new Set(currentTaskIds).add(taskId));

        try {
            await deleteTaskMutation.mutateAsync({ taskId });
            setFeedbackMessage("Entry removed from the ledger.");
            setFeedbackTone("success");
        } catch (error) {
            setFeedbackMessage(getTrpcErrorMessage(error));
            setFeedbackTone("error");
        } finally {
            setDeletingTaskIds((currentTaskIds) => {
                const remainingTaskIds = new Set(currentTaskIds);
                remainingTaskIds.delete(taskId);
                return remainingTaskIds;
            });
        }
    };

    return {
        feedbackMessage,
        feedbackTone,
        deletingTaskIds,
        deleteTaskById,
    };
}
