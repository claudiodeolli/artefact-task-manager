type ErrorWithTrpcData = Error & {
    readonly cause?: unknown;
    readonly data?: {
        readonly validationMessage?: string | null;
        readonly code?: string;
    } | null;
};

const unexpectedErrorMessage = "An unexpected error occurred. Please try again.";
const networkErrorMessage = "Could not reach the server. Check your connection and try again.";
const notFoundErrorMessage = "This entry no longer exists. It may have been deleted.";
const networkFailurePattern = /failed to fetch|networkerror|load failed|network request failed/i;

export default function getTrpcErrorMessage(error: unknown): string {
    if (!(error instanceof Error)) {
        return unexpectedErrorMessage;
    }

    const { data, cause, message } = error as ErrorWithTrpcData;

    if (data?.validationMessage) {
        return data.validationMessage;
    }

    if (data?.code === "NOT_FOUND") {
        return notFoundErrorMessage;
    }

    if (data?.code === "INTERNAL_SERVER_ERROR") {
        return unexpectedErrorMessage;
    }

    if (!data && (cause instanceof TypeError || networkFailurePattern.test(message))) {
        return networkErrorMessage;
    }

    return message || unexpectedErrorMessage;
}
