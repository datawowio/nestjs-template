import { Module } from '@nestjs/common';
import { AddProductUseCase } from '@usecase/product/add-product.usecase';
import { GetProductListUseCase } from '@usecase/product/get-product-list.usecase';
import { RemoveProductUseCase } from '@usecase/product/remove-product.usecase';

@Module({
  imports: [],
  providers: [AddProductUseCase, GetProductListUseCase, RemoveProductUseCase],
  exports: [AddProductUseCase, GetProductListUseCase, RemoveProductUseCase],
})
export class ProductModule {}
