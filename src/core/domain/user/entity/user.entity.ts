import { EntityWithIdAndTimeStamp } from '@core/domain/base/base.entity';
import { OrderEntity } from '@core/domain/order/entity/order.entity';

export class UserEntity extends EntityWithIdAndTimeStamp {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  orders: OrderEntity[];
}
