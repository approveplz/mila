import * as z from "zod";

export const DeleteAccountSchema = z.object({
    password: z
        .string(),
});

export type DeleteAccountFormData = z.infer<typeof DeleteAccountSchema>