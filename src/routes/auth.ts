import express from 'express';
import { login, register } from '../controllers/AuthController';
import { loginValidator, registerValidator } from '../validators/middleware/user-validators';


export default (router: express.Router) => {
  router.post('/auth/users/register',registerValidator,register);
  router.post('/auth/users/login',loginValidator, login);
};
