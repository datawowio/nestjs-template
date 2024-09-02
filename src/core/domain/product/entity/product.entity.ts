import { EntityWithIdAndTimeStamp } from '@core/domain/base/base.entity';
import { OrderEntity } from '@core/domain/order/entity/order.entity';

export class ProductEntity extends EntityWithIdAndTimeStamp {
  title: string;
  price: number;
  stock: number;
  orders?: OrderEntity[];
}
