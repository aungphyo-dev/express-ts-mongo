import express from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.service';
import { createJwt, passwordHash } from '../utils';
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const hashPassword = await passwordHash(req.body.password);
    await UserModel.create({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
    });
    return res.status(200).send({ message: 'Registration successful' });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'User already existed' });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  const { identifier, password } = req.body;
  const response = await UserModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).select('username email superAdmin password');
  if (!response)
    return res.status(400).send({ message: 'Something went wrong!' });
  const user = response.toObject();
  const check = await bcrypt.compare(password, user.password);
  if (!check)
    return res
      .status(400)
      .send({ message: 'Email or password does not work!' });
  return res.status(200).send({
    data: user,
    jwt: createJwt(user),
  });
};
