"use client";

import formatZodValidationMessage from "@/helpers/formatZodValidationMessage";
import getTrpcErrorMessage from "@/helpers/getTrpcErrorMessage";
import type { TaskDto } from "@/models/TaskDto";
import { createTaskInputSchema } from "@/schemas/createTaskInputSchema";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import useCreateTaskMutation from "./useCreateTaskMutation";
import useUpdateTaskMutation from "./useUpdateTaskMutation";

type TaskFormSubmissionStatus = "created" | "updated";

export default function useTaskFormController(initialTask?: TaskDto) {
    const router = useRouter();
    const createTaskMutation = useCreateTaskMutation();
    const updateTaskMutation = useUpdateTaskMutation();
    const [title, setTitle] = useState(initialTask?.title ?? "");
    const [description, setDescription] = useState(initialTask?.description ?? "");
    const [validationMessage, setValidationMessage] = useState<string | null>(null);

    const isSubmittingTask = createTaskMutation.isPending || updateTaskMutation.isPending;
    const taskSubmissionError = createTaskMutation.error ?? updateTaskMutation.error;
    const submissionErrorMessage = taskSubmissionError ? getTrpcErrorMessage(taskSubmissionError) : null;

    const clearTaskSubmissionState = () => {
        setValidationMessage(null);
        createTaskMutation.reset();
        updateTaskMutation.reset();
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        clearTaskSubmissionState();
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        clearTaskSubmissionState();
    };

    const handleTaskFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationResult = createTaskInputSchema.safeParse({ title, description });

        if (!validationResult.success) {
            setValidationMessage(formatZodValidationMessage(validationResult.error));
            return;
        }

        setValidationMessage(null);

        const submissionStatus: TaskFormSubmissionStatus = initialTask ? "updated" : "created";

        const handleSubmissionSuccess = () => {
            router.push(`/?status=${submissionStatus}`);
            router.refresh();
        };

        if (initialTask) {
            updateTaskMutation.mutate(
                {
                    taskId: initialTask.id,
                    title: validationResult.data.title,
                    description: validationResult.data.description ?? null,
                },
                { onSuccess: handleSubmissionSuccess },
            );
            return;
        }

        createTaskMutation.mutate(
            {
                title: validationResult.data.title,
                description: validationResult.data.description,
            },
            { onSuccess: handleSubmissionSuccess },
        );
    };

    return {
        title,
        description,
        validationMessage,
        submissionErrorMessage,
        isSubmittingTask,
        handleTitleChange,
        handleDescriptionChange,
        handleTaskFormSubmit,
    };
}
