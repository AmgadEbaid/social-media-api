import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateComment {
  @IsString()
  @IsNotEmpty()
  body: string;
}
