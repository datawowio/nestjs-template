import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import config from '@infra/configuration/config';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { PublicV1Controller } from '@application/http/pubic/v1/public.v1.controller';
import { UseCaseModule } from '@application/module/usecase/usecase.module';

import { TestUtils } from '@test/utils/test-utils';

describe('Public API V1 (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let testUtils: TestUtils;

  TestUtils.setup();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmPersistenceModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        UseCaseModule,
      ],
      controllers: [PublicV1Controller],
    }).compile();

    app = moduleFixture.createNestApplication();

    dataSource = app.get(DataSource);
    testUtils = new TestUtils(dataSource);

    await testUtils.reloadFixtures();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('/public/signup (POST)', () => {
    it('should successfully to register a new user with email john@test.com', () => {
      return request(app.getHttpServer())
        .post('/public/signup')
        .send({
          firstname: 'john',
          lastname: 'do',
          email: 'john@test.com',
          password: 'password',
        })
        .expect(201);
    });

    it('should error when register with duplicate email john@test.com', () => {
      return request(app.getHttpServer())
        .post('/public/signup')
        .send({
          firstname: 'john',
          lastname: 'do',
          email: 'john@test.com',
          password: 'password',
        })
        .expect(400);
    });
  });

  describe('/public/signin (POST)', () => {
    it('should successfully to sign in as user john with email john@test.com', () => {
      return request(app.getHttpServer())
        .post('/public/signin')
        .send({
          email: 'john@test.com',
          password: 'password',
        })
        .expect(201);
    });

    it('should error when sign in as user john with email john@test.com but wrong password', () => {
      return request(app.getHttpServer())
        .post('/public/signin')
        .send({
          email: 'john@test.com',
          password: 'non-password',
        })
        .expect(400);
    });
  });
});
