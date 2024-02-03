import express from 'express';
import {
  createUserSchema,
  loginUserSchema,
} from '../validators/user-validator';
import bcrypt from 'bcrypt';
import { createNewUser, getUserByEmail } from '../models/Users';
import { createJwt } from '../helpers';
import { SafeParseError } from 'zod';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password, email } = req.body;
    const validate = createUserSchema.safeParse({ username, password, email });
    if (validate.success) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = await createNewUser({
        username,
        password: hashPassword,
        email,
      });
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      res.status(200).send({
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        jwt: createJwt(payload),
      });
    } else {
      const { error } = validate as SafeParseError<object>;
      res.status(400).send(error.flatten().fieldErrors);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'User already existed' });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const validate = loginUserSchema.safeParse({ email, password });
    if (validate.success) {
      const user = await getUserByEmail(email);
      const check = await bcrypt.compare(password, user.password);
      if (!check)
        return res
          .status(400)
          .send({ message: 'Email or password does not work!' });
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      };
      res.status(200).send({
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        jwt: createJwt(payload),
      });
    } else {
      const { error } = validate as SafeParseError<object>;
      res.status(400).send(error.flatten().fieldErrors);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'Something went wrong!' });
  }
};
