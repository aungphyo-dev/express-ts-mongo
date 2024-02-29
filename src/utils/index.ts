import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJwt = (payload: object) => {
  return jwt.sign(payload, process.env['TOKEN_SECRET'] as string);
};
export const passwordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const apiVersion = (): string => `v${process.env['API_VERSION'] || 1}`;
