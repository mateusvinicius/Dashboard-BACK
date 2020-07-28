import { User } from '@Models/User';
import { Controller } from '@Decorators/Controller';
import { Post } from '@Decorators/Route';
import UserService, { AuthUser } from '@Services/UserService';
import { Body, Res } from '@Decorators/params';
import { Response } from 'express';

@Controller('/Users')
export default class UserController {
  UserService:UserService

  constructor() {
    this.UserService = new UserService();
  }

  @Post('/')
  async auth(@Body(['Email', 'Password']) usuario:User, @Res() res:Response):Promise<Response> {
    try {
      const user:AuthUser = await this.UserService.Auth(usuario);

      return res.status(200).json({ token: user.token });
    } catch (err) {
      res.status(400).json({
        Error: err.message,
      });
    }
  }
}
