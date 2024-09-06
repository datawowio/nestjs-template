import { Global, Module } from '@nestjs/common';

import { OrderUseCaseModule } from './order/order-usecase.module';
import { ProductUseCaseModule } from './product/product-usecase.module';
import { UserUseCaseModule } from './user/user-usecase.module';

@Global()
@Module({
  imports: [OrderUseCaseModule, ProductUseCaseModule, UserUseCaseModule],
  providers: [],
  exports: [OrderUseCaseModule, ProductUseCaseModule, UserUseCaseModule],
})
export class UseCaseModule {}
