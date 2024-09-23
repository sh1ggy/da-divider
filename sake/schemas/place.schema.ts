import { z } from "zod";
import { createPlaceContactSchema } from "./contact.schema";
import { createItemAssignmentSchema, createItemSchema } from "./item.schema";

export const createPlaceSchema = z
  .object({
    date: z.coerce.date(),
    items: z.array(createItemSchema).optional(),
    contacts: z.array(createPlaceContactSchema),
    groupName: z.string().min(2),
    itemAssignments: z.array(createItemAssignmentSchema).optional(),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

// Creates a partial schema from createUserSchema where all properties are optional
export const updatePlaceSchema = createPlaceSchema.partial();
