import express from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.service';
import { createJwt } from '../utils';
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const response = await new UserModel({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
    }).save();
    const user = response.toObject();
    res.status(200).send({
      data: user,
      jwt: createJwt(user),
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'User already existed' });
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select(
      'username email superAdmin password'
    );
    const check = await bcrypt.compare(password, user.password);
    if (!check)
      return res
        .status(400)
        .send({ message: 'Email or password does not work!' });
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
      superAdmin: user.superAdmin,
    };
    console.log(payload);
    res.status(200).send({
      data: payload,
      jwt: createJwt(payload),
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'Something went wrong!' });
  }
};
