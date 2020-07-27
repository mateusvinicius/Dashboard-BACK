import { User } from '@Models/User';
import { Controller } from '@Decorators/Controller';
import { Post } from '@Decorators/Route';
import UserService from '@Services/UserService';
import { Body, Res } from '@Decorators/params';
import { Response } from 'express';

@Controller('/Users')
export default class UserController {
  UserService:UserService

  constructor() {
    this.UserService = new UserService();
  }

  @Post('/')
  async auth(@Body(['email', 'password']) usuario:User, @Res() res:Response):Promise<Response> {
    try {
      const user = await this.UserService.Auth(usuario);
      return res.status(200);
    } catch (err) {
      res.status(400).json({
        Error: err.message,
      });
    }
  }
}
