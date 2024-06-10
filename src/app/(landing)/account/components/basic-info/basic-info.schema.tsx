import * as z from "zod";

export const BasicInfoSchema = z.object({
    fullName:z
    .string()
        .min(1, { message: "Full Name is required" }),
    // firstName: z
    //     .string()
    //     .min(1, { message: "First Name is required" }),
    // lastName: z
    //     .string()
    //     .min(1, { message: "Last Name is required" }),
    emailAddress: z
        .string()
        .min(1, { message: "Email Address is required" })
        .email({ message: "Enter a valid email" }),
    phone: z
        .string()
    // .max(140, { message: 'Maximum 140 characters allowed' })
});

export type BasicInfoFormData = z.infer<typeof BasicInfoSchema>