import { z } from "zod";
import { createContactSchema } from "./contact.schema";
import { createItemSchema } from "./item.schema";

export const createPlaceSchema = z
  .object({
    date: z.date(),
    items: z.array(createItemSchema).optional(),
    contacts: z.array(createContactSchema),
    groupName: z.string().min(2),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

// Creates a partial schema from createUserSchema where all properties are optional
export const updatePlaceSchema = createPlaceSchema.partial();
