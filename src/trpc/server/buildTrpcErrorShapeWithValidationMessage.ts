import { ZodError } from "zod";

type TrpcErrorShape = {
    readonly message: string;
    readonly code: string | number;
    readonly data: Record<string, unknown>;
};

type TrpcErrorWithCause = Error & {
    readonly cause?: unknown;
};

export default function buildTrpcErrorShapeWithValidationMessage(shape: TrpcErrorShape, error: TrpcErrorWithCause) {
    const validationMessage = error.cause instanceof ZodError ? error.cause.issues[0]?.message : undefined;

    return {
        ...shape,
        data: {
            ...shape.data,
            validationMessage: validationMessage ?? null,
        },
    };
}
