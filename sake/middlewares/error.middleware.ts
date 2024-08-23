import { Response, Request, NextFunction } from "express";

//this will be called by default without try catch or if next(error);
export function errorMiddleware(
  error: any,
  response: Response,
  next: NextFunction
) {
  const resStatus = response.statusCode != 200 ? response.statusCode : null;
  let status = error.status || resStatus || 500;
  const message = error.message || "Something went wrong";
  response.status(status).json({
    status,
    message,
  });
}
