import { match } from 'oxide.ts';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderUseCase } from '@usecase/order/create-order.usecase';
import { EditOrderUseCase } from '@usecase/order/edit-order.usecase';
import { GetProductListUseCase } from '@usecase/product/get-product-list.usecase';

import { CreateOrderDto } from '@core/domain/order/dto/create-order.dto';
import { EditOrderDto } from '@core/domain/order/dto/edit-order.dto';

@Controller({
  path: 'user',
  version: '1',
})
export class UserV1Controller {
  constructor(
    private getProductListUseCase: GetProductListUseCase,
    private createOrderUseCase: CreateOrderUseCase,
    private editOrderUseCase: EditOrderUseCase,
  ) {}

  @Get('products')
  async getProductList() {
    const result = await this.getProductListUseCase.exec();
    return match(result, {
      Ok(products) {
        return {
          data: products,
        };
      },
      Err(msg) {
        throw new BadRequestException(msg);
      },
    });
  }

  @Post('orders')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.createOrderUseCase.exec(createOrderDto);
    return match(result, {
      Ok(newOrder) {
        return {
          data: newOrder,
        };
      },
      Err(msg) {
        throw new BadRequestException(msg);
      },
    });
  }

  @Put('orders/:orderId')
  async editOrder(
    @Param('orderId') orderId: string,
    @Body() editOrderDto: EditOrderDto,
  ) {
    const result = await this.editOrderUseCase.exec({
      orderId: parseInt(orderId),
      ...editOrderDto,
    });
    return match(result, {
      Ok(editOrder) {
        return {
          data: editOrder,
        };
      },
      Err(msg) {
        throw new BadRequestException(msg);
      },
    });
  }
}
