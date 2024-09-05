import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

import { TestUtils } from '@test/utils/test-utils';

describe('Public API (e2e)', () => {
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

  describe('/api/v1/public/signup (POST)', () => {
    it('should successfully to register a new user with email john@test.com', () => {
      return request(app.getHttpServer())
        .post('/api/v1/public/signup')
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
        .post('/api/v1/public/signup')
        .send({
          firstname: 'john',
          lastname: 'do',
          email: 'john@test.com',
          password: 'password',
        })
        .expect(400);
    });
  });

  describe('/api/v1/public/signin (POST)', () => {
    it('should successfully to sign in as user john with email john@test.com', () => {
      return request(app.getHttpServer())
        .post('/api/v1/public/signin')
        .send({
          email: 'john@test.com',
          password: 'password',
        })
        .expect(201);
    });

    it('should error when sign in as user john with email john@test.com but wrong password', () => {
      return request(app.getHttpServer())
        .post('/api/v1/public/signin')
        .send({
          email: 'john@test.com',
          password: 'non-password',
        })
        .expect(400);
    });
  });
});
