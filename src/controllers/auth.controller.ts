import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.service';
import { createJwt, passwordHash } from '../utils';

export class AuthController {
  private readonly usersService: typeof UserModel;

  constructor() {
    this.usersService = UserModel;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
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
  }
  async login(req: Request, res: Response) {
    const { identifier, password } = req.body;
    const response = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!response)
      return res.status(400).send({ message: 'Something went wrong!' });
    const user = response.toObject();
    const check = await bcrypt.compare(password, user.password);
    const { password: p, ...userData } = user;
    if (!check)
      return res
        .status(400)
        .send({ message: 'Email or password does not work!' });
    return res.status(200).send({
      data: userData,
      jwt: createJwt({ p, ...userData }),
    });
  }
}
