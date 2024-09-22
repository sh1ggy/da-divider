import { z } from "zod";
import { createItemSchema } from "./item.schema";
import { ObjectId } from "mongodb";

export const createContactSchema = z
  .object({
    id: z.custom<ObjectId>(),
    name: z.string().min(2, "Name must be a minimum of two letters"),
    email: z.string().email("Invalid email format"),
    mobile: z.string().min(8, "Mobile must be a minimum of 8 letters"),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

export const createPlaceContactSchema = createContactSchema.extend({
  itemAssignments: z.array(createItemSchema).optional(),
});

// Creates a partial schema from createUserSchema where all properties are optional
export const updateContactSchema = createContactSchema.partial();

// Creates a partial schema from createPlaceContactSchema where all properties are optional
export const updatePlaceContactSchema = createPlaceContactSchema.partial();
