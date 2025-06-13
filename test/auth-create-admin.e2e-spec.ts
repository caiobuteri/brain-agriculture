import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';

describe('Auth flow (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dataSource = moduleRef.get(DataSource);

    // Limpa o usuário de teste, se existir
    await dataSource
      .getRepository(User)
      .delete({ email: 'caiobuteri@admin.com' });
  });

  it('should login as superadmin', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'superadmin', // mesmo email da seed
      password: 'superadmin', // senha da seed
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    token = res.body.accessToken;
  });

  it('should create a new admin user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/admins')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caio Admin',
        email: 'caiobuteri@admin.com',
        password: 'Teste123!',
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      email: 'caiobuteri@admin.com',
      name: 'Caio Admin',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
