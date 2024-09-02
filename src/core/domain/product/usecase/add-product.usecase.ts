import { Result } from 'oxide.ts';

import { ProductEntity } from '../entity/product.entity';

export interface AddProductCommand {
  title: string;
  price: number;
  stock: number;
}

export interface IAddProductUseCase {
  exec: (
    addProductCommand: AddProductCommand,
  ) => Promise<Result<ProductEntity, string>>;
}
