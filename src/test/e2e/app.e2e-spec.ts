import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

import { TestUtils } from '@test/utils/test-utils';

describe('AppController (e2e)', () => {
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

  it('/api/v1/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect('application good health !!!');
  });

  afterAll(async () => {
    app.close();
  });
});
