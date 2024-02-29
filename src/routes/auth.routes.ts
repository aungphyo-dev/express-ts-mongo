import express from 'express';
import { validator } from '../middlewares/validator';
import { createUserSchema, loginUserSchema } from '../types/user.types';
import { AuthController } from '../controllers/auth.controller';
const authController = new AuthController();
export default (router: express.Router) => {
  router.post(
    '/auth/register',
    validator(createUserSchema),
    authController.register
  );
  router.post('/auth/login', validator(loginUserSchema), authController.login);
};
