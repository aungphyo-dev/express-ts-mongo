import express from 'express';
import { isOwner, verifyUserToken } from '../middlewares/authenticate';
import { UsersController } from '../controllers/user.controller';
const usersController = new UsersController();
//routes are private
export default (router: express.Router) => {
  router.get('/users', usersController.index);
  router.get('/users/:id', verifyUserToken, usersController.show);
  router.delete('/users/:id', verifyUserToken, isOwner, usersController.delete);
  router.put('/users/:id', verifyUserToken, isOwner, usersController.update);
};
