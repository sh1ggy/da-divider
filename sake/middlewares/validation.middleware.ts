// REF - https://www.mongodb.com/developer/products/atlas/mongodb-express-prisma-validation/#validation-middleware
import { NextFunction, Response, Request } from "express";
import { ZodSchema } from "zod";

// Validation middleware
export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    // parse request body
    const { success, error } = schema.safeParse(req.body);

    // handle non-compliant request body
    if (!success) {
      return res.status(400).json({
        status: false,
        message: error.errors
          .map((t) => `${t.path[0] ?? ""}: ${t.message}`)
          .join(", "),
      });
    }

    // move on if successful. 
    next();
  };
