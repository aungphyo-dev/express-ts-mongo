import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from '../controllers/UserController';
import { isOwner, verifyUserToken } from '../middlewares/authenticate';

export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.get('/users/:id', verifyUserToken, getUser);
  router.delete('/users/:id', verifyUserToken, isOwner, deleteUser);
  router.put('/users/:id', verifyUserToken, isOwner, updateUser);
};
