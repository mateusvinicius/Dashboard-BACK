import { Controller } from '@Decorators/Controller';
import { Post } from '@Decorators/Route';
import UserService from '@Services/UserService';
import { Request, Response } from 'express';
import { Body } from '@Decorators/params';

@Controller('/Users')
export default class UserController {
  private User:UserService

  constructor() {
    this.User = new UserService();
  }

  @Post('/')
  create(@Body(['email', 'password']) body, res:Response) {
    try {

    } catch (err) {
      return res.status(200).json({
        message: err.message,
      });
    }
  }
}
