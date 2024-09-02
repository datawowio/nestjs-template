import { match } from 'oxide.ts';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { GetOrderSummaryUseCase } from '@usecase/order/get-order-summary.usecase';
import { AddProductUseCase } from '@usecase/product/add-product.usecase';
import { GetProductListUseCase } from '@usecase/product/get-product-list.usecase';

import { CreateProductDto } from '@core/domain/product/dto/create-product.dto';

@Controller({
  path: 'admin',
  version: '1',
})
export class AdminV1Controller {
  constructor(
    private addProductUseCase: AddProductUseCase,
    private getProductListUseCase: GetProductListUseCase,
    private getOrderSummaryUseCase: GetOrderSummaryUseCase,
  ) {}

  @Post('products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const result = await this.addProductUseCase.exec(createProductDto);
    return match(result, {
      Ok(newProduct) {
        return {
          success: true,
          message: 'new product created',
          data: newProduct,
        };
      },
      Err() {
        throw new BadRequestException();
      },
    });
  }

  @Get('products')
  async getProductList() {
    const result = await this.getProductListUseCase.exec();
    return match(result, {
      Ok(products) {
        return {
          data: products,
        };
      },
      Err() {
        throw new BadRequestException();
      },
    });
  }

  @Get('orders/summary')
  async getOrderSummary() {
    const result = await this.getOrderSummaryUseCase.exec();
    return match(result, {
      Ok(orderSummary) {
        return {
          data: orderSummary,
        };
      },
      Err() {
        throw new BadRequestException();
      },
    });
  }
}
