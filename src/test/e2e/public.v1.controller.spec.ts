import * as request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSingInUseCase } from '@usecase/user/user-signin.usecase';
import { UserSingUpUseCase } from '@usecase/user/user-signup.usecase';

import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { PublicV1Controller } from '@application/http/pubic/v1/public.v1.controller';

// TODO: Add testing database module
// for init, setup, and cleanup
describe('PublicV1Controller', () => {
  let app: INestApplication;

  beforeAll(() => {
    initializeTransactionalContext();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmPersistenceModule],
      providers: [UserSingUpUseCase, UserSingInUseCase],
      controllers: [PublicV1Controller],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should sign up user"', async () => {
    const { body } = await request
      .agent(app.getHttpServer())
      .post('/public/signup')
      .send({
        firstname: 'john4',
        lastname: 'do',
        email: 'john4@test.com',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty('id');
  });
});
