// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import App from './App';
import { User } from './Models/User';

createConnection().then(async () => {
  const usuario = new User();
  usuario.Email = 'mateus@gmail.com';
  usuario.Password = '32486466';

  await usuario.save();
  App.listen(3000);
}).catch((error) => console.log(`TypeORM Error:${error}`));
