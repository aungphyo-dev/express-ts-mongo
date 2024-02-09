import { Request, Response } from 'express';
import { UserModel } from '../models/user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) return res.status(404).json({ error: 'User not found!' });
  return res.status(200).json(user);
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  console.log(user);
  if (!user) return res.status(400).json({ message: 'User not found!' });
  return res.sendStatus(204);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.sendStatus(400);
  }

  const user = await UserModel.findById(id);
  if (!user) return res.status(400).json({ message: 'Something went wrong!' });
  user.username = username;
  user.email = email;
  await user.save();
  return res.status(200).json({ message: 'Update user successfully!' });
};
