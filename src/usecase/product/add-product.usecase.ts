import { Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { IProductRepository } from '@core/domain/product/repository/product.repository';
import {
  AddProductCommand,
  IAddProductUseCase,
} from '@core/domain/product/usecase/add-product.usecase';

@Injectable()
export class AddProductUseCase implements IAddProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  createNewProduct(addProductCommand: AddProductCommand): ProductEntity {
    const newProduct = new ProductEntity();
    newProduct.title = addProductCommand.title;
    newProduct.price = addProductCommand.price;
    newProduct.stock = addProductCommand.stock;
    return newProduct;
  }

  async exec(
    addProductCommand: AddProductCommand,
  ): Promise<Result<ProductEntity, string>> {
    const product = this.createNewProduct(addProductCommand);
    const newProduct = await this.productRepository.save(product);
    return Ok(newProduct);
  }
}
