import { ObjectId } from "mongodb";
import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
});

export const createItemAssignmentSchema = z.object({
  contactId: z.custom<ObjectId>(),
  itemId: z.custom<ObjectId>(),
});

export const updateItemSchema = createItemSchema.partial();
