import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const verifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers['authorization'];
  if (!token)
    return res.status(401).send('Access Denied / Unauthorized request');
  try {
    token = token.split(' ')[1]; // Remove Bearer from string
    if (token === 'null' || !token)
      return res.status(401).send('Unauthorized request');
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send('Unauthorized request');
    req.body.localsUser = verifiedUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Unauthorized | Invalid Token');
  }
};
export const isOwnerOrSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (id !== req.body.localsUser.id || !req.body.localsUser.superAdmin)
      return res.status(401).send('Access Denied / Unauthorized request');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Unauthorized | Access Denied');
  }
};
