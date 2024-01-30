import express from 'express';
import { deleteUserById, getUsers, getUserById } from '../models/Users';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: 'User not found!' });
  }
};
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    return res.status(204).json({ message: 'Delete user successfully!' }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    user.email = email;
    await user.save();

    return res.status(200).json({ message: 'Update user successfully!' }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
