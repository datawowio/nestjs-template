import { ProductEntity } from '../entity/product.entity';

export abstract class IProductRepository {
  abstract save<T>(data: T): Promise<T>;

  abstract findAllProduct({ id }?: { id?: number[] }): Promise<ProductEntity[]>;
}
