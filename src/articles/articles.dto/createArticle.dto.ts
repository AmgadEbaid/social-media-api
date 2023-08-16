import { IsString, IsTaxId, isString } from 'class-validator';

export class createArticle {
  @IsString()
  titile: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;
}
