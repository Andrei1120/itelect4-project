import { z } from "zod";

export const itemSchema = z.object({
  title: z
    .string()
    .min(3, "Item title must be at least 3 characters.")
    .refine(
      (t) => !["stuff", "thing", "item", "something"].includes(t.trim().toLowerCase()),
      "Please enter a specific item title (e.g. 'AirPods Pro', 'AquaFlask')."
    ),
  category: z.string().min(1, "Please select a category."),
  type: z.enum(["lost", "found"]),
  location: z
    .string()
    .min(3, "Campus location is required.")
    .refine(
      (loc) => !["unknown", "n/a", "none", "somewhere"].includes(loc.trim().toLowerCase()),
      "Please specify a real campus location (e.g. Sentru, Library, Cafeteria)."
    ),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long."),
});

export type ItemFormValues = z.infer<typeof itemSchema>;
