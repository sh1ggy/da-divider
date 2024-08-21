import { z } from "zod";

export const createContactSchema = z
  .object({
    name: z.string().min(2, "Name must be a minimum of two letters"),
    email: z.string().email("Invalid email format"),
    mobile: z.string().min(8, "Mobile must be a minimum of 8 letters"),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

// Creates a partial schema from createUserSchema where all properties are optional
export const updateContactSchema = createContactSchema.partial();
