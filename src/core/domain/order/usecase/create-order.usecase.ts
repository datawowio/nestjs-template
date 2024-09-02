import { Result } from 'oxide.ts';

import { OrderEntity } from '../entity/order.entity';

export interface CreateOrderCommand {
  detail?: string;
  userId: number;
  productIds: number[];
}

export interface ICreateOrderUseCase {
  exec: (
    createOrderCommand: CreateOrderCommand,
  ) => Promise<Result<OrderEntity, string>>;
}
