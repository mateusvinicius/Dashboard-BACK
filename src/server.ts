// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './App';
import { User } from './Models/User';

createConnection().then(async (connection) => {
  const usuario = new User();
  usuario.firstName = 'mateus';
  usuario.lastName = 'vinicius';
  usuario.age = 10;

  await usuario.save();
}).catch((error) => console.log(error));

App.listen(3000);
