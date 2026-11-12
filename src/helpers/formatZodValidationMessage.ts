import type { ZodError } from "zod";

export default function formatZodValidationMessage(zodError: ZodError): string {
    return zodError.issues[0]?.message ?? "The submitted data is invalid.";
}
