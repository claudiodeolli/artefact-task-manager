type ErrorWithValidationMessage = Error & {
    readonly data?: {
        readonly validationMessage?: string | null;
    } | null;
};

const unexpectedErrorMessage = "An unexpected error occurred. Please try again.";

export default function getTrpcErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        const validationMessage = (error as ErrorWithValidationMessage).data?.validationMessage;

        if (validationMessage) {
            return validationMessage;
        }

        if (error.message) {
            return error.message;
        }
    }

    return unexpectedErrorMessage;
}
