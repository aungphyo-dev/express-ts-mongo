import { Router } from 'express';
import users from './users';
import auth from './auth';

const router = Router();
const routes = (): Router => {
  auth(router);
  users(router);
  return router;
};
export default routes;
