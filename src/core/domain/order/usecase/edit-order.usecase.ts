import { Result } from 'oxide.ts';

import { OrderEntity } from '../entity/order.entity';

export interface EditOrderCommand {
  orderId: number;
  detail?: string;
  productIds?: number[];
}

export interface IEditOrderUseCase {
  exec: (
    editOrderCommand: EditOrderCommand,
  ) => Promise<Result<OrderEntity, string>>;
}
