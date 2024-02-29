import { Router } from 'express';
import users from './user.routes';
import auth from './auth.routes';

const router = Router();
export default (): Router => {
  auth(router);
  users(router);
  return router;
};
