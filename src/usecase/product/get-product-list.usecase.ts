import { Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import { IGetProductListUseCase } from '@core/domain/product/usecase/get-product-list.usecase';

@Injectable()
export class GetProductListUseCase implements IGetProductListUseCase {
  constructor(private productRepository: IProductRepository) {}

  async exec(): Promise<Result<ProductEntity[], string>> {
    const produces = await this.productRepository.findAllProduct();
    return Ok(produces);
  }
}
