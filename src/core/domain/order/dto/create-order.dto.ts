import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];
}
