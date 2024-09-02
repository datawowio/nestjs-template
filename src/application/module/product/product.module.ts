import { Module } from '@nestjs/common';
import { AddProductUseCase } from '@usecase/product/add-product.usecase';
import { GetProductListUseCase } from '@usecase/product/get-product-list.usecase';

@Module({
  imports: [],
  providers: [AddProductUseCase, GetProductListUseCase],
  exports: [AddProductUseCase, GetProductListUseCase],
})
export class ProductModule {}
