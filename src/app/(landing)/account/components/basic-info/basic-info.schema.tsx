import * as z from "zod";

export const BasicInfoSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "Business Name is required" }),
    lastName: z
        .string()
        .min(1, { message: "Contact Name is required" }),
    emailAddress: z
        .string()
        .min(1, { message: "Cntact Email is required" })
        .email({ message: "Enter a valid email" }),
    phone: z
        .string()
    // .max(140, { message: 'Maximum 140 characters allowed' })
});

export type BasicInfoFormData = z.infer<typeof BasicInfoSchema>