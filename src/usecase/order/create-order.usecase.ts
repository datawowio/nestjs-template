import { Err, Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { OrderEntity } from '@core/domain/order/entity/order.entity';
import { IOrderRepository } from '@core/domain/order/repository/order.repository';
import {
  CreateOrderCommand,
  ICreateOrderUseCase,
} from '@core/domain/order/usecase/create-order.usecase';
import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private userRepository: IUserRepository,
  ) {}

  async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepository.findUser({ id: userId });
  }

  async getProducts(productIds: number[]): Promise<ProductEntity[]> {
    return await this.productRepository.findAllProduct({ id: productIds });
  }

  createOrder(user: UserEntity, products: ProductEntity[]): OrderEntity {
    const order = new OrderEntity();
    order.transactionId = Date.now().toString();
    order.user = user;
    order.products = products;
    return order;
  }

  async exec(
    createOrderCommand: CreateOrderCommand,
  ): Promise<Result<OrderEntity, string>> {
    const currUser = await this.getUser(createOrderCommand.userId);

    if (!currUser) {
      return Err('user not found');
    }

    const products = await this.getProducts(createOrderCommand.productIds);

    if (products.length === 0) {
      return Err('products not found');
    }

    const order = this.createOrder(currUser, products);
    const newOrder = await this.orderRepository.save(order);

    return Ok(newOrder);
  }
}
