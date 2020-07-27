import { User } from '@Models/User';

export default class UserService {
  public async Auth(email:string, password:string) {
    const user:User = await User.findOne({
      Email: email,
    });

    if (!user) { throw new Error('Usuario não localizado !'); }
  }

  public async CreateUser(usuario:User) {

  }
}
