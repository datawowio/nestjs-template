import { Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { IOrderRepository } from '@core/domain/order/repository/order.repository';
import {
  IGetOrderSummaryUseCase,
  OrderSummary,
} from '@core/domain/order/usecase/get-order-summary.usecase';

@Injectable()
export class GetOrderSummaryUseCase implements IGetOrderSummaryUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async exec(): Promise<Result<OrderSummary[], string>> {
    const orderSummary = await this.orderRepository.findOrderSummary();
    return Ok(orderSummary);
  }
}
