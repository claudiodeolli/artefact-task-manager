"use client";

import getTrpcErrorMessage from "@/helpers/getTrpcErrorMessage";
import type { FeedbackTone } from "@/models/FeedbackTone";
import { useState } from "react";
import useDeleteTaskMutation from "./useDeleteTaskMutation";

export default function useTaskDeletionController(initialFeedbackMessage: string | null) {
    const deleteTaskMutation = useDeleteTaskMutation();
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(initialFeedbackMessage);
    const [feedbackTone, setFeedbackTone] = useState<FeedbackTone>("success");
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

    const deleteTaskById = (taskId: string) => {
        setDeletingTaskId(taskId);

        deleteTaskMutation.mutate(
            { taskId },
            {
                onSuccess: () => {
                    setFeedbackMessage("Entry removed from the ledger.");
                    setFeedbackTone("success");
                },
                onError: (error) => {
                    setFeedbackMessage(getTrpcErrorMessage(error));
                    setFeedbackTone("error");
                },
                onSettled: () => {
                    setDeletingTaskId(null);
                },
            },
        );
    };

    return {
        feedbackMessage,
        feedbackTone,
        deletingTaskId,
        deleteTaskById,
    };
}
