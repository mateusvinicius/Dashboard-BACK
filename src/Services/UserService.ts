import { User } from '@Models/User';
import bcrypt from 'bcryptjs';

export interface AuthUser{
  token:string
}
export default class UserService {
  public async Auth(usuario:User):Promise<AuthUser> {
    const user:User = await User.findOne({
      Email: usuario.Email,
    });

    if (!user) { throw new Error('Email ja cadastrado!'); }

    if (!bcrypt.compare(usuario.Password, user.Password)) {
      throw new Error('Senha invalida !');
    }

    const token :AuthUser = {
      token: await user.GenerateToken(),
    };

    return token;
  }

  public async CreateUser(usuario:User):Promise<User> {
    const user:User = await User.save(usuario);

    return user;
  }
}
