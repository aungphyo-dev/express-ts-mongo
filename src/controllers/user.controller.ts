import { Request, Response } from 'express';
import { UserModel } from '../models/user.service';

export class UsersController {
  private readonly usersService: typeof UserModel;

  constructor() {
    this.usersService = UserModel;
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(req: Request, res: Response) {
    try {
      const users = await this.usersService.find().select('-password');
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.usersService.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found!' });
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.sendStatus(400);
    }

    const user = await this.usersService.findById(id).select('-password');
    if (!user)
      return res.status(400).json({ message: 'Something went wrong!' });
    user.username = username;
    user.email = email;
    await user.save();
    return res.status(200).json({ message: 'Update user successfully!' });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.usersService.findByIdAndDelete(id);
    console.log(user);
    if (!user) return res.status(400).json({ message: 'User not found!' });
    return res.sendStatus(204);
  }
}
