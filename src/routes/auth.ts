import express from 'express';
import { login, register } from '../controllers/AuthController';

export default (router: express.Router) => {
  router.post('/auth/users/register', register);
  router.post('/auth/users/login', login);
};
