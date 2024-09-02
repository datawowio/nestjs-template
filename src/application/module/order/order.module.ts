import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from '@usecase/order/create-order.usecase';
import { EditOrderUseCase } from '@usecase/order/edit-order.usecase';
import { GetOrderSummaryUseCase } from '@usecase/order/get-order-summary.usecase';

@Module({
  imports: [],
  providers: [CreateOrderUseCase, EditOrderUseCase, GetOrderSummaryUseCase],
  exports: [CreateOrderUseCase, EditOrderUseCase, GetOrderSummaryUseCase],
})
export class OrderModule {}
