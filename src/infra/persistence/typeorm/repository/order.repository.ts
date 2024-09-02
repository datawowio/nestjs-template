import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrderEntity } from '@core/domain/order/entity/order.entity';
import { IOrderRepository } from '@core/domain/order/repository/order.repository';
import { OrderSummary } from '@core/domain/order/usecase/get-order-summary.usecase';

import { Order } from '../entity';

@Injectable()
export class OrderRepository
  extends Repository<Order>
  implements IOrderRepository
{
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findOrder(query, relations): Promise<OrderEntity> {
    return await this.repository.findOne({
      where: { id: query.id },
      relations: { user: relations.user, products: relations.products },
    });
  }

  async findOrderSummary(): Promise<OrderSummary[]> {
    const qbTotalProduct = await this.repository.createQueryBuilder('order');
    qbTotalProduct.select(['order.id as order_id']);
    qbTotalProduct.addSelect('COUNT(product.id)', 'total_products');
    qbTotalProduct.leftJoin('order.products', 'product');
    qbTotalProduct.groupBy('order.id');

    const qb = await this.repository.createQueryBuilder('orders');
    qb.leftJoinAndSelect('orders.user', 'user');
    qb.addSelect('summary.total_products', 'total_products');
    qb.leftJoin(
      '(' + qbTotalProduct.getQuery() + ')',
      'summary',
      'summary.order_id = orders.id',
    );

    const rawOrderSummary = await qb.getRawMany();

    return rawOrderSummary.map((rawData) => ({
      id: rawData?.orders_id,
      transactionId: rawData?.orders_transaction_id,
      status: rawData?.orders_status,
      totalProduct: rawData?.total_products,
      user: {
        firstname: rawData?.user_firstname,
        lastname: rawData?.user_lastname,
      },
    }));
  }
}
