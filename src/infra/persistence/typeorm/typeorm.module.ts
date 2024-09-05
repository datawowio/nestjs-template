import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IOrderRepository } from '@core/domain/order/repository/order.repository';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import { IUserRepository } from '@core/domain/user/repository/user.repository';

import { Order, Product, User } from './entity';
import {
  OrderRepository,
  ProductRepository,
  UserRepository,
} from './repository';

export const DataSourceProvider: Provider = {
  provide: DataSource,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const dbConfig = configService.get('database');
    const dataSource = await getInitializedDataSource(dbConfig);
    return addTransactionalDataSource(dataSource);
  },
};

export const getInitializedDataSource = async (
  dbConfig,
): Promise<DataSource> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    entities: [User, Order, Product],
    synchronize: false,
    migrationsRun: false,
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
