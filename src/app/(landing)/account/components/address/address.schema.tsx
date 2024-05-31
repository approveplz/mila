import * as z from "zod";

export const AddressSchema = z.object({
    address: z
        .string(),
    city: z
        .string(),
    state: z
        .string(),
    postCode: z
        .string()
});

export type AddressFormData = z.infer<typeof AddressSchema>