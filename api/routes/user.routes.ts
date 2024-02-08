import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from '../controllers/user.controller';
import {
  isOwnerOrSuperAdmin,
  verifyUserToken,
} from '../middlewares/authenticate';

//routes are private
export default (router: express.Router) => {
  router.get('/users', verifyUserToken, isOwnerOrSuperAdmin, getAllUsers);
  router.get('/users/:id', verifyUserToken, isOwnerOrSuperAdmin, getUser);
  router.delete('/users/:id', verifyUserToken, isOwnerOrSuperAdmin, deleteUser);
  router.put('/users/:id', verifyUserToken, isOwnerOrSuperAdmin, updateUser);
};
