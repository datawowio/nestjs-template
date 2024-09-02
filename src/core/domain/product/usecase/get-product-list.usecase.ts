import { Result } from 'oxide.ts';

import { ProductEntity } from '../entity/product.entity';

export interface IGetProductListUseCase {
  exec: () => Promise<Result<ProductEntity[], string>>;
}
