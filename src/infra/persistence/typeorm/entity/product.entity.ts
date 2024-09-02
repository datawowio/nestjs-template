import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderEntity } from '@core/domain/order/entity/order.entity';
import { ProductEntity } from '@core/domain/product/entity/product.entity';

import { Order } from './order.entity';

@Entity('products')
export class Product implements ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false, type: 'varchar' })
  title: string;

  @Column({ name: 'price', nullable: false, type: 'int' })
  price: number;

  @Column({ name: 'stock', nullable: false, type: 'int' })
  stock: number;

  @ManyToMany(() => Order, (order) => order.products)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
