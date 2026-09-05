import { z } from "zod";

export const claimSchema = z.object({
  itemId: z
    .string()
    .min(1, "Please select an item to claim.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Item ID must be a valid item number."
    ),
  contactEmail: z
    .string()
    .min(1, "Contact email is required.")
    .email("Please provide a valid email address.")
    .refine(
      (email) => email.includes("@") && email.includes("."),
      "Must be a complete, valid email address."
    ),
  claimReason: z
    .string()
    .min(10, "Proof of ownership description must be at least 10 characters.")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      "Please provide more than one word describing proof of ownership."
    ),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;
