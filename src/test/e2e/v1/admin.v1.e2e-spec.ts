import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import config from '@infra/configuration/config';
import { User } from '@infra/persistence/typeorm/entity';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { AdminV1Controller } from '@application/http/admin/v1/admin.v1.controller';
import { UseCaseModule } from '@application/module/usecase/usecase.module';

import { TestUtils } from '@test/utils/test-utils';

describe('Admin API V1 (e2e)', () => {
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
      controllers: [AdminV1Controller],
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

  beforeEach(async () => {
    // Insert seed data into the test database
    const userRepository = dataSource.getRepository(User);
    await userRepository.insert([
      {
        firstname: 'user1',
        lastname: 'test',
        password: 'password1',
        email: 'user1@test.com',
      },
      {
        firstname: 'user2',
        lastname: 'test',
        password: 'password2',
        email: 'user2@test.com',
      },
    ]);
  });

  describe('/admin/users (GET)', () => {
    it('should successfully to register a new user with email john@test.com', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/users')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(2);
    });
  });
});
