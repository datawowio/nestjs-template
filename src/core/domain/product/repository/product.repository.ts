import { ProductEntity } from '../entity/product.entity';

type FindProductQuery = {
  id: number;
};

export abstract class IProductRepository {
  abstract save<T>(data: T): Promise<T>;
  abstract findProduct(query: FindProductQuery): Promise<ProductEntity>;
  abstract findAllProduct({ id }?: { id?: number[] }): Promise<ProductEntity[]>;
  abstract deleteProduct(productId: number): Promise<ProductEntity>;
}
