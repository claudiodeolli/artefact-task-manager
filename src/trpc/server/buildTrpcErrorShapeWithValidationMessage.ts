import { ZodError } from "zod";

type TrpcErrorShape = {
    readonly message: string;
    readonly code: string | number;
    readonly data: Record<string, unknown>;
};

type TrpcErrorWithCause = Error & {
    readonly cause?: unknown;
};

const internalServerErrorMessage = "An unexpected error occurred. Please try again.";

export default function buildTrpcErrorShapeWithValidationMessage(shape: TrpcErrorShape, error: TrpcErrorWithCause) {
    const validationMessage = error.cause instanceof ZodError ? error.cause.issues[0]?.message : undefined;
    const isInternalServerError = shape.data.code === "INTERNAL_SERVER_ERROR";
    const sanitizedData = isInternalServerError
        ? Object.fromEntries(Object.entries(shape.data).filter(([dataKey]) => dataKey !== "stack"))
        : shape.data;

    return {
        ...shape,
        message: isInternalServerError ? internalServerErrorMessage : shape.message,
        data: {
            ...sanitizedData,
            validationMessage: validationMessage ?? null,
        },
    };
}
