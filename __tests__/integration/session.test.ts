import Request from 'supertest';
import connection from '../Typeorm';
import { User } from '../../src/Models/User';
import App from '../../src/App';

describe('Auth Route', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });
  it('shoult auth with valid credentials', async () => {
    const usuario:User = new User();
    usuario.Email = 'mateusvn@gmail.com';
    usuario.Password = '32486466';
    await usuario.save();

    const Response = await Request(App).post('/Users/').send({
      Email: 'mateusvn@gmail.com',
      Password: '32486466',
    });

    expect(Response.body).toHaveProperty('token');
  });
});
