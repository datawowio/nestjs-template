import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
