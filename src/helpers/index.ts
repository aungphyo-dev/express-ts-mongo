import jwt from 'jsonwebtoken';

export const createJwt = (payload: object) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
};
export const apiVersion = () : string=> (`v${process.env["API_VERSION"] || 1}`)