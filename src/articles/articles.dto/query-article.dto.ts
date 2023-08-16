import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class QueryArticle {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  take: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  skip: number;
}
