import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email().min(1),
});
export const loginUserSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(6),
});
