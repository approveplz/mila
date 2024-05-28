import * as z from "zod";

export const amoeSchema = z.object({
    token: z
        .string()
        .min(1, { message: "Captcha is required" }),
    giveaway: z
        .string()
        .min(1, { message: "Address is required" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
    phone: z
        .string()
        .min(1, { message: "Phone is required" }),
    first_name: z
        .string()
        .min(1, { message: "Full name is required" }),
    last_name: z
        .string()
        .min(1, { message: "Full name is required" }),
    address: z
        .string()
        .min(1, { message: "Address is required" }),
    state: z
        .string()
        .min(1, { message: "Address is required" }),
    city: z
        .string()
        .min(1, { message: "State is required" }),
    post_code: z
        .string()
        .min(1, { message: "Address is required" }),
    is_over_18: z.boolean().default(false),
});

export type AMOEFormData = z.infer<typeof amoeSchema>