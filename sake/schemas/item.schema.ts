import { ObjectId } from "mongodb";
import { z } from "zod";

export const createItemSchema = z.object({
  id: z.instanceof(ObjectId),
  name: z.string().min(2),
  price: z.number().positive(),
});
