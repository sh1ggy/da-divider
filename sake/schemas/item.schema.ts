import { z } from "zod";
import { createContactSchema } from "./contact.schema";

export const createItemSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  contacts: z.array(createContactSchema),
});
