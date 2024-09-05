import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from '@usecase/order/create-order.usecase';
import { EditOrderUseCase } from '@usecase/order/edit-order.usecase';
import { GetProductListUseCase } from '@usecase/product/get-product-list.usecase';

import config from '@infra/configuration/config';
import { Product } from '@infra/persistence/typeorm/entity';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { UserV1Controller } from '@application/http/user/v1/user.v1.controller';

import { TestUtils } from '@test/utils/test-utils';

describe('User V1 API (e2e)', () => {
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
      ],
      controllers: [UserV1Controller],
      providers: [CreateOrderUseCase, EditOrderUseCase, GetProductListUseCase],
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
