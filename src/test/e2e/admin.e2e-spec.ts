import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

import { User } from '@infra/persistence/typeorm/entity';

import { TestUtils } from '@test/utils/test-utils';

describe('Admin API (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let testUtils: TestUtils;

  TestUtils.setup();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
    });

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

  describe('/api/v1/admin/users (GET)', () => {
    it('should successfully to register a new user with email john@test.com', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/admin/users')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(2);
    });
  });
});
