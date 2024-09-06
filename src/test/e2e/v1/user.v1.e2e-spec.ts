import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Product } from '@infra/persistence/typeorm/entity';

import { UserV1Controller } from '@application/http/user/v1/user.v1.controller';

import { TestUtils } from '@test/utils/test-utils';

describe('User API V1 (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let testUtils: TestUtils;

  TestUtils.setup();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await TestUtils.createTestModuleUtil({
      controllers: [UserV1Controller],
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
    const productRepository = dataSource.getRepository(Product);
    await productRepository.insert([
      {
        title: 'product-a',
        price: 100,
        stock: 100,
      },
      {
        title: 'product-b',
        price: 100,
        stock: 100,
      },
    ]);
  });

  describe('/user/products (GET)', () => {
    it('should successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/products')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });
});
