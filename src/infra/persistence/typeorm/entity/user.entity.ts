import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderEntity } from '@core/domain/order/entity/order.entity';
import { UserEntity } from '@core/domain/user/entity/user.entity';

import { Order } from './order.entity';

@Entity('users')
export class User implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstname', nullable: false, type: 'varchar' })
  firstname: string;

  @Column({ name: 'lastname', nullable: false, type: 'varchar' })
  lastname: string;

  @Column({ name: 'password', nullable: false, type: 'varchar' })
  password: string;

  @Column({ name: 'email', nullable: false, type: 'varchar' })
  email: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
