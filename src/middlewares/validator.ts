import { NextFunction, Request, Response } from 'express';
import { SafeParseError, ZodSchema } from 'zod';

export const validator =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.safeParse(req.body);
    if (!validate.success) {
      const { error } = validate as SafeParseError<object>;
      res.status(400).send(error.flatten().fieldErrors);
    } else {
      req.body = validate.data;
      next();
    }
  };
