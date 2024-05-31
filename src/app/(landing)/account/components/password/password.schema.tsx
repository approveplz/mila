import * as z from "zod";

export const PasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Must have at least 8 characters' }),
    newPassword: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Must have at least 8 characters' }),
    confirmPassword: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Must have at least 8 characters' })
});

export type PasswordFormData = z.infer<typeof PasswordSchema>