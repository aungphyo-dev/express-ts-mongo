import express from 'express';
import bcrypt from 'bcrypt';
import { createNewUser, getUserByEmail } from '../models/Users';
import { createJwt } from '../helpers';
export const register = async (req: express.Request, res: express.Response) => {
  try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const user = await createNewUser({
        username : req.body.username,
        password: hashPassword,
        email : req.body.email,
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
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'User already existed' });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email,password} = req.body
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
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'Something went wrong!' });
  }
};
