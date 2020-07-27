// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './App';

createConnection().then(async () => {
  App.listen(3000);
}).catch((error) => console.log(`TypeORM Error:${error}`));
