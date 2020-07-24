import { Body, Response } from '@Decorators/params';
import { Controller } from '@Decorators/Controller';
import { Post } from '@Decorators/Route';
import UserService from '@Services/UserService';

@Controller('/Users')
export default class UserController {
  private User:UserService

  constructor() {
    this.User = new UserService();
  }

  @Post('/')
  index(@Body() body, @Response() res) {
    console.log(body);
  }
}
