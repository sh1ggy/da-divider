import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
});
