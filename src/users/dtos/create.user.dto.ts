import { IsEmail, IsString } from 'class-validator';

export class createUser {
  @IsString()
  diplayname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
