import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { OrderModule } from '@application/module/order/order.module';
import { ProductModule } from '@application/module/product/product.module';

import { AdminV1Controller } from './v1/admin.v1.controller';

@Module({
  imports: [ProductModule, OrderModule],
  providers: [],
  controllers: [AdminV1Controller],
})
export class AdminHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(AdminV1Controller);
  }
}
