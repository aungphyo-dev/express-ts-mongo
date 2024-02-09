import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from '../controllers/user.controller';
import { isOwner, verifyUserToken } from '../middlewares/authenticate';

//routes are private
export default (router: express.Router) => {
  router.get('/users', verifyUserToken, getAllUsers);
  router.get('/users/:id', verifyUserToken, getUser);
  router.delete('/users/:id', verifyUserToken, isOwner, deleteUser);
  router.put('/users/:id', verifyUserToken, isOwner, updateUser);
};
