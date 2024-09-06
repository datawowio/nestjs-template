import { Result } from 'oxide.ts';

import { ProductEntity } from '../entity/product.entity';

export interface IRemoveProductUseCase {
  exec: (productId: number) => Promise<Result<ProductEntity, string>>;
}
