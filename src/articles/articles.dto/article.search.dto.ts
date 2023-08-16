import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export enum Order {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class SerchQuery {
  @IsNotEmpty()
  @IsString()
  query: string;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  take: number;
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  skip: number;
  @IsEnum(Order)
  order: string;
}
