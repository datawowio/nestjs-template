import { match } from 'oxide.ts';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { GetOrderSummaryUseCase } from '@usecase/order/get-order-summary.usecase';
import { AddProductUseCase } from '@usecase/product/add-product.usecase';
import { GetProductListUseCase } from '@usecase/product/get-product-list.usecase';
import { RemoveProductUseCase } from '@usecase/product/remove-product.usecase';
import { AdminGetUsersUseCase } from '@usecase/user/admin-get-users.usecase';

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
    private adminGetUsersUseCase: AdminGetUsersUseCase,
    private removeProductUseCase: RemoveProductUseCase,
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

  @Delete('products/:productId')
  async removeProduct(@Param('productId') productId: string) {
    const result = await this.removeProductUseCase.exec(Number(productId));
    return match(result, {
      Ok(deletedProduct) {
        return {
          success: true,
          message: 'item was deleted',
          data: deletedProduct,
        };
      },
      Err(msg) {
        throw new BadRequestException(msg);
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

  @Get('users')
  async getUsers() {
    const result = await this.adminGetUsersUseCase.exec();
    return match(result, {
      Ok(users) {
        return {
          data: users,
        };
      },
      Err() {
        throw new BadRequestException();
      },
    });
  }
}
