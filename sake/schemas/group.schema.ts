import { z } from "zod";
import { createContactSchema } from "./contact.schema";

export const createGroupSchema = z
  .object({
    name: z.string().min(3, "Name must be a minimum of three characters"),
    contact: z.array(createContactSchema).optional(),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

// Creates a partial schema from createUserSchema where all properties are optional
export const updateGroupSchema = createGroupSchema.partial();
