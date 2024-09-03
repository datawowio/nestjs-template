import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IOrderRepository } from '@core/domain/order/repository/order.repository';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import { IUserRepository } from '@core/domain/user/repository/user.repository';

import config from '@infra/configuration/config';

import { Order, Product, User } from './entity';
import {
  OrderRepository,
  ProductRepository,
  UserRepository,
} from './repository';

const dbConfig = config().database;

export const DataSourceProvider = {
  provide: DataSource,
  useFactory: async () => {
    const dataSource = await getInitializedDataSource(dbConfig);
    return addTransactionalDataSource(dataSource);
  },
};

export const getInitializedDataSource = (dbConfig): Promise<DataSource> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    entities: [User, Order, Product],
    synchronize: true,
  } as DataSourceOptions);

  return dataSource.initialize();
};

@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Order, Product])],
  providers: [
    DataSourceProvider,
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: IProductRepository, useClass: ProductRepository },
  ],
  exports: [DataSource, IUserRepository, IOrderRepository, IProductRepository],
})
export class TypeOrmPersistenceModule {}
