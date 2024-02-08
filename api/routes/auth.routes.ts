import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { validator } from '../middlewares/validator';
import { createUserSchema, loginUserSchema } from '../types/user.types';

export default (router: express.Router) => {
  router.post('/auth/register', validator(createUserSchema), register);
  router.post('/auth/login', validator(loginUserSchema), login);
};
