import * as z from "zod";

export const BecomeAPartnerSchema = z.object({
    businessName: z
        .string()
        .min(1, { message: "Business Name is required" }),
    contactName: z
        .string()
        .min(1, { message: "Contact Name is required" }),
    contactEmail: z
        .string()
        .min(1, { message: "Cntact Email is required" })
        .email({ message: "Enter a valid email" }),
    optional: z
        .string()
        // .max(140, { message: 'Maximum 140 characters allowed' })
});

export type BecomeAPartnerFormData = z.infer<typeof BecomeAPartnerSchema>