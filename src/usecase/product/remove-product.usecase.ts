import { Err, Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import { IRemoveProductUseCase } from '@core/domain/product/usecase/remove-product.usecase';

@Injectable()
export class RemoveProductUseCase implements IRemoveProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async exec(productId: number): Promise<Result<ProductEntity, string>> {
    const target = await this.productRepository.findProduct({ id: productId });

    if (!target) {
      return Err('target not found');
    }

    const produces = await this.productRepository.deleteProduct(productId);

    return Ok(produces);
  }
}
