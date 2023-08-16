import { IsString, IsOptional } from 'class-validator';

export class UpDateArticle {
  @IsOptional()
  @IsString()
  titile: string;
  @IsOptional()
  @IsString()
  slug: string;
  @IsOptional()
  @IsString()
  content: string;
}
