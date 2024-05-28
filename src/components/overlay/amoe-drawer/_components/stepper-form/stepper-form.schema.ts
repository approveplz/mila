import * as z from "zod";

export const amoeSchema = z.object({
    token: z
        .string()
        .min(1, { message: "Captcha is required" }),
    giveaway: z
        .string()
        .min(1, { message: "Giveaway is required" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
    email_code: z
        .string()
        .min(1, { message: "Code is required" }),
    phone: z
        .string()
        .min(1, { message: "Phone is required" }),
    phone_code: z
        .string()
        .min(1, { message: "Code is required" }),
    first_name: z
        .string()
        .min(1, { message: "First name is required" }),
    last_name: z
        .string()
        .min(1, { message: "Last name is required" }),
    line_1: z
        .string()
        .min(1, { message: "Address is required" }),
    region: z
        .string()
        .min(1, { message: "State is required" }),
    city: z
        .string()
        .min(1, { message: "City is required" }),
    postal_code: z
        .string()
        .min(1, { message: "Postal code is required" }),
    is_over_18_and_agrees_tc: z.boolean().default(false),
});

export type AMOEFormData = z.infer<typeof amoeSchema>