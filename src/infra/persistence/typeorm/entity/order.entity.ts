import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  ORDER_STATUS,
  OrderEntity,
  OrderStatus,
} from '@core/domain/order/entity/order.entity';
import { ProductEntity } from '@core/domain/product/entity/product.entity';
import { UserEntity } from '@core/domain/user/entity/user.entity';

import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order implements OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'transaction_id', nullable: false, type: 'varchar' })
  transactionId: string;

  @Column({ name: 'detail', nullable: true, type: 'varchar' })
  detail: string;

  @Column({
    name: 'status',
    nullable: false,
    default: ORDER_STATUS.OPEN,
    type: 'varchar',
  })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.id)
  user: UserEntity;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products?: ProductEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
