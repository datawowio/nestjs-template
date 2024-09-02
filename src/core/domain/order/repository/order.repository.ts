import { OrderEntity } from '../entity/order.entity';
import { OrderSummary } from '../usecase/get-order-summary.usecase';

type OrderRelations = {
  user?: boolean;
  products?: boolean;
};

type OrderQuery = {
  id: number;
};

export abstract class IOrderRepository {
  abstract save<T>(data: T): Promise<T>;

  abstract findOrder(
    query: OrderQuery,
    relations?: OrderRelations,
  ): Promise<OrderEntity>;

  abstract findOrderSummary(): Promise<OrderSummary[]>;
}
