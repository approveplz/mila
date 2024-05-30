import * as z from "zod";

export const PasswordSchema = z.object({
    currentPassword: z
        .string(),
    newPassword: z
        .string(),
    confirmPassword: z
        .string()
});

export type PasswordFormData = z.infer<typeof PasswordSchema>