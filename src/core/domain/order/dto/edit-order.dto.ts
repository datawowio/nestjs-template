import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditOrderDto {
  @IsString()
  @IsOptional()
  detail?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  productIds?: number[];
}
