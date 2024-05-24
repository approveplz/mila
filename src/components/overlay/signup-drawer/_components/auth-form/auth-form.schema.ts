import * as z from "zod";

export const signUpSchema = z.object({
    full_name: z
        .string()
        .min(1, { message: "Full name is required" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: 'Must have at least 8 characters' }),
    phone: z
        .string()
        .min(1, { message: "Phone is required" }),
    state: z
        .string()
        .min(1, { message: "State is required" }),
    is_outside_of_us: z.boolean().default(false),
    is_over_18: z.boolean().default(false),
    token: z
        .string()
        .min(1, { message: "Captcha is required" })
});

export type SignUpFormData = z.infer<typeof signUpSchema>