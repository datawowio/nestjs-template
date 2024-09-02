import { Global, Module } from '@nestjs/common';
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

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get('database');
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: [User, Order, Product],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Order, Product]),
  ],
  providers: [
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: IProductRepository, useClass: ProductRepository },
  ],
  exports: [IUserRepository, IOrderRepository, IProductRepository],
})
export class TypeOrmPersistenceModule {}
