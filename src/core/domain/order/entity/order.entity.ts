import { EntityWithIdAndTimeStamp } from '@core/domain/base/base.entity';
import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { UserEntity } from '@core/domain/user/entity/user.entity';

export const ORDER_STATUS = {
  OPEN: 'OPEN',
  PROCESS: 'PROCESS',
  CLOSE: 'CLOSE',
};

export type OrderStatus = keyof typeof ORDER_STATUS;

export class OrderEntity extends EntityWithIdAndTimeStamp {
  transactionId: string;
  detail?: string;
  status: OrderStatus;
  user: UserEntity;
  products?: ProductEntity[];
}
