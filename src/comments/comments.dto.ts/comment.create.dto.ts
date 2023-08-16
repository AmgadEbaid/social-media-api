import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateComment {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNumber()
  @IsNotEmpty()
  articleId: number;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
