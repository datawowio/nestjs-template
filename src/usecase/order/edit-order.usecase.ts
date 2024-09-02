import { Err, Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { OrderEntity } from '@core/domain/order/entity/order.entity';
import { IOrderRepository } from '@core/domain/order/repository/order.repository';
import {
  EditOrderCommand,
  IEditOrderUseCase,
} from '@core/domain/order/usecase/edit-order.usecase';
import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';

@Injectable()
export class EditOrderUseCase implements IEditOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private userRepository: IUserRepository,
  ) {}

  async getOrder(orderId: number): Promise<OrderEntity> {
    return await this.orderRepository.findOrder(
      { id: orderId },
      { user: true, products: true },
    );
  }

  async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepository.findUser({ id: userId });
  }

  async getProducts(productIds: number[]): Promise<ProductEntity[]> {
    return await this.productRepository.findAllProduct({
      id: productIds,
    });
  }

  createOrder(user: UserEntity, products: ProductEntity[]): OrderEntity {
    const order = new OrderEntity();
    order.transactionId = Date.now().toString();
    order.user = user;
    order.products = products;
    return order;
  }

  async exec(
    editOrderCommand: EditOrderCommand,
  ): Promise<Result<OrderEntity, string>> {
    const currOrder = await this.getOrder(editOrderCommand.orderId);

    if (!currOrder) {
      return Err('order not found');
    }

    const currUser = await this.getUser(currOrder.user.id);

    if (!currUser) {
      return Err('user not found');
    }

    if (editOrderCommand.productIds) {
      const products = await this.getProducts(editOrderCommand.productIds);
      currOrder.products = products;
    }

    if (editOrderCommand.detail) {
      currOrder.detail = editOrderCommand.detail;
    }

    const newOrder = await this.orderRepository.save(currOrder);

    return Ok(newOrder);
  }
}
