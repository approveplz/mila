import * as z from "zod";

export const sigInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Must have at least 8 characters' }),
    // redirectTo: z
    //     .string()
    //     .min(1, { message: "Password is required" })
});

export type SigInFormData = z.infer<typeof sigInSchema>