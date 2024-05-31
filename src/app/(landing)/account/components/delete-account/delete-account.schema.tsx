import * as z from "zod";

export const DeleteAccountSchema = z.object({
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Must have at least 8 characters' }),
});

export type DeleteAccountFormData = z.infer<typeof DeleteAccountSchema>