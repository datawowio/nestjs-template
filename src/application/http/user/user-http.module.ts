import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { OrderModule } from '@application/module/order/order.module';
import { ProductModule } from '@application/module/product/product.module';

import { UserV1Controller } from './v1/user.v1.controller';

@Module({
  imports: [ProductModule, OrderModule],
  providers: [],
  controllers: [UserV1Controller],
})
export class UserHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes();
  }
}
