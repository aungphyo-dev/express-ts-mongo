import jwt from 'jsonwebtoken';

export const createJwt = (payload: {}) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
};
