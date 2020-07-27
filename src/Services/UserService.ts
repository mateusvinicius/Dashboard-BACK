import { User } from '@Models/User';

export default class UserService {
  public async Auth(usuario:User) {
    const user:User = await User.findOne({
      Email: usuario.Email,
    });

    if (!user) { throw new Error('Usuario não localizado !'); }
  }

  public async CreateUser(usuario:User) {

  }
}
